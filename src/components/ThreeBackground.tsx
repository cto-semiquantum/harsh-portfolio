'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useSystem } from '@/src/context/SystemContext';

// ─── GLSL Shaders ─────────────────────────────────────────────────────────────
const meshVertexShader = /* glsl */`
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uMouseStrength;

  varying vec2  vUv;
  varying float vElevation;

  // Smooth noise function
  vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  vec3 fade(vec3 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }

  float cnoise(vec3 P) {
    vec3 Pi0 = floor(P), Pi1 = Pi0 + vec3(1.0);
    Pi0 = mod(Pi0, 289.0); Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P), Pf1 = Pf0 - vec3(1.0);
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz, iz1 = Pi1.zzzz;
    vec4 ixy  = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);
    vec4 gx0 = ixy0 / 7.0; vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0); vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0)); gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    vec4 gx1 = ixy1 / 7.0; vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1); vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0)); gx1 -= sz1 * (step(0.0, gx1) - 0.5); gy1 -= sz1 * (step(0.0, gy1) - 0.5);
    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x), g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z), g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x), g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z), g111 = vec3(gx1.w,gy1.w,gz1.w);
    vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
    g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
    g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);
    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000,n100,n010,n110), vec4(n001,n101,n011,n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
  }

  void main() {
    vUv = uv;

    // Base wave using noise
    float noise1 = cnoise(vec3(position.x * 0.5 + uTime * 0.12, position.y * 0.5, uTime * 0.08));
    float noise2 = cnoise(vec3(position.x * 0.3 - uTime * 0.07, position.y * 0.3 + uTime * 0.05, 0.5));

    // Mouse ripple — distance from mouse position
    float dist = distance(uv, uMouse * 0.5 + 0.5);
    float mouseWave = uMouseStrength * sin(dist * 18.0 - uTime * 4.0) * exp(-dist * 4.0);

    float elevation = noise1 * 0.35 + noise2 * 0.2 + mouseWave * 0.5;
    vElevation = elevation;

    vec3 newPos = position;
    newPos.z += elevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

const meshFragmentShader = /* glsl */`
  uniform float uTime;
  varying vec2  vUv;
  varying float vElevation;

  void main() {
    // Electric blue → cyan gradient based on elevation + uv
    vec3 colorLow  = vec3(0.07, 0.1, 0.22);   // deep navy
    vec3 colorMid  = vec3(0.23, 0.51, 0.96);  // #3B82F6 electric blue
    vec3 colorHigh = vec3(0.02, 0.71, 0.83);  // #06B6D4 cyan

    float t = (vElevation + 0.55) * 0.9;
    vec3 col = mix(colorLow, colorMid, smoothstep(0.0, 0.5, t));
    col = mix(col, colorHigh, smoothstep(0.5, 1.0, t));

    // Edge fade
    float edgeFade = smoothstep(0.0, 0.12, vUv.x) *
                     smoothstep(1.0, 0.88, vUv.x) *
                     smoothstep(0.0, 0.12, vUv.y) *
                     smoothstep(1.0, 0.88, vUv.y);

    float alpha = 0.25 * edgeFade;
    gl_FragColor = vec4(col, alpha);
  }
`;

// ─── 1. Flowing GLSL Mesh ─────────────────────────────────────────────────────
function FlowingMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const mouseRef = useRef({ x: 0.5, y: 0.5, strength: 0 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });

  const uniforms = useMemo(() => ({
    uTime:          { value: 0 },
    uMouse:         { value: new THREE.Vector2(0.5, 0.5) },
    uMouseStrength: { value: 0 },
  }), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current.x = e.clientX / window.innerWidth;
      targetMouseRef.current.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;

    // Smooth mouse interpolation
    mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;
    mouseRef.current.strength += (0.6 - mouseRef.current.strength) * 0.03;

    uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
    uniforms.uMouseStrength.value = mouseRef.current.strength;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.8, 0, 0]} position={[0, -1.2, -1]}>
      <planeGeometry args={[14, 10, 80, 60]} />
      <shaderMaterial
        vertexShader={meshVertexShader}
        fragmentShader={meshFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        wireframe={false}
      />
    </mesh>
  );
}

// ─── 2. Glowing Particles ─────────────────────────────────────────────────────
function GlowParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const { fpsLow } = useSystem();
  const count = fpsLow ? 300 : 700;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3;

      // Alternate blue / cyan tint
      if (Math.random() > 0.5) {
        col[i * 3] = 0.23; col[i * 3 + 1] = 0.51; col[i * 3 + 2] = 0.96; // blue
      } else {
        col[i * 3] = 0.02; col[i * 3 + 1] = 0.71; col[i * 3 + 2] = 0.83; // cyan
      }
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.004;
    pointsRef.current.rotation.x += delta * 0.002;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
}

// ─── 3. Background Star Field ─────────────────────────────────────────────────
function StarField() {
  const ref = useRef<THREE.Points>(null!);
  const count = 400;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.003;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#93C5FD"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.5}
      />
    </Points>
  );
}

// ─── 4. Holographic Grid Lines ─────────────────────────────────────────────────
function GridLines() {
  const ref = useRef<THREE.LineSegments>(null!);
  const count = 10;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];

    // Horizontal lines
    for (let i = 0; i <= count; i++) {
      const y = (i / count - 0.5) * 10 - 3;
      positions.push(-8, y, -4, 8, y, -4);
    }
    // Vertical lines
    for (let i = 0; i <= count; i++) {
      const x = (i / count - 0.5) * 16;
      positions.push(x, -5, -4, x, 5, -4);
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.03 + Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
    }
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial
        color="#3B82F6"
        transparent
        opacity={0.04}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

// ─── 5. Scroll Camera Zoom ─────────────────────────────────────────────────────
function ScrollCamera() {
  const { camera } = useThree();

  useEffect(() => {
    const handleScroll = () => {
      const t = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      // Subtle z-axis movement: camera pulls back as you scroll
      (camera as THREE.PerspectiveCamera).position.z = 5 + t * 2;
      camera.position.y = t * -0.5;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [camera]);

  return null;
}

// ─── 6. Mouse Parallax Scene Wrapper ─────────────────────────────────────────
function ParallaxScene() {
  const groupRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!groupRef.current) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const mx = (e.clientX - cx) / cx;
      const my = -(e.clientY - cy) / cy;
      groupRef.current.rotation.y = mx * 0.06;
      groupRef.current.rotation.x = my * 0.04;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <group ref={groupRef}>
      <StarField />
      <GlowParticles />
      <GridLines />
      <FlowingMesh />
    </group>
  );
}

// ─── 7. Main Export ───────────────────────────────────────────────────────────
export default function ThreeBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      style={{ background: '#05070A' }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#05070A']} />
        <ParallaxScene />
        <ScrollCamera />
      </Canvas>
    </div>
  );
}
