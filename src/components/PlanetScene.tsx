'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useSystem } from '@/src/context/SystemContext';

// ─── Spring-physics mouse ─────────────────────────────────────────────────────
function useMouse() {
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return { target, current };
}

// ─── Texture builder helpers ─────────────────────────────────────────────────
function buildEarthTexture(): THREE.CanvasTexture {
  const W = 1024, H = 512;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // Deep ocean base
  const ocean = ctx.createLinearGradient(0, 0, W, H);
  ocean.addColorStop(0,   '#0a081a');
  ocean.addColorStop(0.4, '#120d2b');
  ocean.addColorStop(1,   '#070512');
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, W, H);

  // Ocean shimmer streaks
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const w = 20 + Math.random() * 120;
    const g = ctx.createLinearGradient(x, y, x + w, y + 4);
    g.addColorStop(0, 'transparent');
    g.addColorStop(0.5, '#a78bfa');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.fillRect(x, y, w, 2);
  }

  // Continent blobs — cybernetic violet-themed colors
  const continentColors = [
    '#251545', '#3d256b', '#180a2b', 
    '#4c1d95', '#1e1b4b', '#312e81', 
    '#111827', '#030712'
  ];

  ctx.globalAlpha = 1;
  // Large landmasses
  const landSeeds = [
    { cx: 0.18, cy: 0.4,  rx: 0.10, ry: 0.22 }, // Americas
    { cx: 0.52, cy: 0.38, rx: 0.08, ry: 0.25 }, // Europe/Africa
    { cx: 0.70, cy: 0.35, rx: 0.12, ry: 0.20 }, // Asia
    { cx: 0.78, cy: 0.68, rx: 0.07, ry: 0.10 }, // Australia
  ];

  for (const s of landSeeds) {
    for (let blob = 0; blob < 20; blob++) {
      const bx = (s.cx + (Math.random() - 0.5) * s.rx * 2.5) * W;
      const by = (s.cy + (Math.random() - 0.5) * s.ry * 2.5) * H;
      const br = (18 + Math.random() * 60);
      const col = continentColors[Math.floor(Math.random() * continentColors.length)];
      const bg = ctx.createRadialGradient(bx, by, 0, bx, by, br);
      bg.addColorStop(0, col);
      bg.addColorStop(0.6, col + 'cc');
      bg.addColorStop(1, 'transparent');
      ctx.globalAlpha = 0.6 + Math.random() * 0.4;
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.ellipse(bx, by, br, br * (0.6 + Math.random() * 0.7), Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Mountain/highland neon tint
  ctx.globalAlpha = 0.25;
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * W, y = Math.random() * H;
    const r = 8 + Math.random() * 25;
    const hg = ctx.createRadialGradient(x, y, 0, x, y, r);
    hg.addColorStop(0, '#7000FF');
    hg.addColorStop(1, 'transparent');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Cybernetic Ice caps (purple/cyan glows)
  ctx.globalAlpha = 0.8;
  const iceN = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, H * 0.18);
  iceN.addColorStop(0, '#a5f3fc');
  iceN.addColorStop(0.6, '#38bdf855');
  iceN.addColorStop(1, 'transparent');
  ctx.fillStyle = iceN;
  ctx.fillRect(0, 0, W, H * 0.18);

  const iceS = ctx.createRadialGradient(W / 2, H, 0, W / 2, H, H * 0.14);
  iceS.addColorStop(0, '#c084fc');
  iceS.addColorStop(0.6, '#818cf855');
  iceS.addColorStop(1, 'transparent');
  ctx.fillStyle = iceS;
  ctx.fillRect(0, H * 0.86, W, H * 0.14);

  ctx.globalAlpha = 1;
  return new THREE.CanvasTexture(canvas);
}

function buildCityLightsTexture(): THREE.CanvasTexture {
  const W = 1024, H = 512;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  // Neon violet and cyan city clusters
  const clusters = [
    { cx: 0.18, cy: 0.38, density: 70, color: '#c084fc' },
    { cx: 0.52, cy: 0.33, density: 100, color: '#38bdf8' },
    { cx: 0.70, cy: 0.30, density: 120, color: '#a78bfa' },
    { cx: 0.78, cy: 0.66, density: 40, color: '#e9d5ff' },
  ];

  for (const cl of clusters) {
    for (let i = 0; i < cl.density; i++) {
      const x = (cl.cx + (Math.random() - 0.5) * 0.18) * W;
      const y = (cl.cy + (Math.random() - 0.5) * 0.22) * H;
      const r = 0.5 + Math.random() * 2.0;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 2.5);
      g.addColorStop(0, cl.color);
      g.addColorStop(0.5, '#ffffff');
      g.addColorStop(1, 'transparent');
      ctx.globalAlpha = 0.5 + Math.random() * 0.5;
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r * 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
  return new THREE.CanvasTexture(canvas);
}

function buildCloudTexture(): THREE.CanvasTexture {
  const W = 1024, H = 512;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, W, H);

  // Wispy sci-fi nebula-like gas clouds
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const rw = 40 + Math.random() * 140;
    const rh = 10 + Math.random() * 45;
    const g = ctx.createRadialGradient(x, y, 0, x, y, rw);
    g.addColorStop(0, 'rgba(167, 139, 250, 0.45)');
    g.addColorStop(0.5, 'rgba(56, 189, 248, 0.15)');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.globalAlpha = 0.25 + Math.random() * 0.45;
    ctx.beginPath();
    ctx.ellipse(x, y, rw, rh, (Math.random() - 0.5) * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  return new THREE.CanvasTexture(canvas);
}

// ─── Glowing Fresnel Atmosphere Shader ───────────────────────────────────────
const FresnelShader = {
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    uniform vec3 glowColor;
    void main() {
      // Glow intensity increases near the edge (fresnel)
      float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.6);
      gl_FragColor = vec4(glowColor, 1.0) * intensity;
    }
  `
};

function AtmosphereGlow() {
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);

  useFrame((state) => {
    // Breathing glow animation
    if (shaderRef.current) {
      const time = state.clock.getElapsedTime();
      const wave = Math.sin(time * 1.5) * 0.05 + 0.95;
      // Adjust intensity slightly over time
    }
  });

  const uniforms = useMemo(() => ({
    glowColor: { value: new THREE.Color('#7000FF') }
  }), []);

  return (
    <>
      {/* Blue outer limb */}
      <Sphere args={[1.26, 64, 64]}>
        <shaderMaterial
          ref={shaderRef}
          vertexShader={FresnelShader.vertexShader}
          fragmentShader={FresnelShader.fragmentShader}
          uniforms={uniforms}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          transparent
          depthWrite={false}
        />
      </Sphere>
      
      {/* Cyber cyan inner limb */}
      <Sphere args={[1.15, 64, 64]}>
        <shaderMaterial
          vertexShader={FresnelShader.vertexShader}
          fragmentShader={FresnelShader.fragmentShader}
          uniforms={{
            glowColor: { value: new THREE.Color('#38bdf8') }
          }}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          transparent
          depthWrite={false}
        />
      </Sphere>
    </>
  );
}

// ─── Orbiting Satellites ──────────────────────────────────────────────────────
function Satellite({ radius, speed, color, tilt, initialAngle }: 
  { radius: number; speed: number; color: string; tilt: number; initialAngle: number }) {
  const meshRef = useRef<THREE.Group>(null!);
  const angle = useRef(initialAngle);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    angle.current += delta * speed;

    // Apply 3D orbit formula with rotation tilt
    const x = Math.cos(angle.current) * radius;
    const z = Math.sin(angle.current) * radius;
    const y = Math.sin(angle.current) * radius * Math.sin(tilt);

    meshRef.current.position.set(x, y, z);
    
    // Face the satellite towards the center planet
    meshRef.current.lookAt(0, 0, 0);
  });

  return (
    <group ref={meshRef}>
      {/* Core probe */}
      <mesh>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Solar Panel Wing Left */}
      <mesh position={[-0.08, 0, 0]}>
        <boxGeometry args={[0.08, 0.015, 0.005]} />
        <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={1.5} />
      </mesh>
      {/* Solar Panel Wing Right */}
      <mesh position={[0.08, 0, 0]}>
        <boxGeometry args={[0.08, 0.015, 0.005]} />
        <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={1.5} />
      </mesh>
      {/* Point beacon flashing */}
      <pointLight color={color} intensity={1.5} distance={0.5} decay={2} />
    </group>
  );
}

// ─── Orbital particle flow system ─────────────────────────────────────────────
function OrbitalRing({ radius, count, speed, color, size }:
  { radius: number; count: number; speed: number; color: string; size: number }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const jitter = (Math.random() - 0.5) * 0.15;
      pos[i * 3]     = (radius + jitter) * Math.cos(angle);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.12;
      pos[i * 3 + 2] = (radius + jitter) * Math.sin(angle);
    }
    return pos;
  }, [count, radius]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
  });

  return (
    <group rotation={[0.2, 0, 0.15]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent color={color} size={size}
          sizeAttenuation depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

// ─── Clouds layer ────────────────────────────────────────────────────────────
function Clouds() {
  const ref = useRef<THREE.Mesh>(null!);
  const tex = useMemo(() => buildCloudTexture(), []);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });
  return (
    <Sphere ref={ref} args={[1.025, 64, 64]}>
      <meshStandardMaterial
        map={tex} transparent alphaMap={tex}
        opacity={0.45} roughness={1} metalness={0}
        depthWrite={false} blending={THREE.NormalBlending}
      />
    </Sphere>
  );
}

// ─── Planet body ─────────────────────────────────────────────────────────────
function Planet({ mouse }: { mouse: { target: React.MutableRefObject<{x:number;y:number}>; current: React.MutableRefObject<{x:number;y:number}> } }) {
  const groupRef   = useRef<THREE.Group>(null!);
  const planetRef  = useRef<THREE.Mesh>(null!);
  const bobRef     = useRef(0);

  const earthTex  = useMemo(() => buildEarthTexture(),      []);
  const lightsTex = useMemo(() => buildCityLightsTexture(), []);

  useFrame((_, delta) => {
    bobRef.current += delta;

    // Gentle floating bob
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(bobRef.current * 0.35) * 0.08;
    }

    // Spring-physics mouse parallax
    const stiffness = 0.04;
    mouse.current.current.x += (mouse.target.current.x - mouse.current.current.x) * stiffness;
    mouse.current.current.y += (mouse.target.current.y - mouse.current.current.y) * stiffness;

    if (groupRef.current) {
      groupRef.current.rotation.x = mouse.current.current.y * 0.15;
      groupRef.current.rotation.y = mouse.current.current.x * 0.15;
    }

    // Planet self-rotation (Slowed down for realism)
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.035;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Earth surface */}
      <Sphere ref={planetRef} args={[1, 96, 96]}>
        <meshStandardMaterial
          map={earthTex}
          roughness={0.7}
          metalness={0.2}
          emissiveMap={lightsTex}
          emissive={new THREE.Color('#38bdf8')}
          emissiveIntensity={1.6}
        />
      </Sphere>

      <Clouds />
      <AtmosphereGlow />
    </group>
  );
}

// ─── Solid Glowing Energy Rings ───────────────────────────────────────────────
function EnergyRings() {
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.12;
      ring1Ref.current.rotation.y += delta * 0.05;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.08;
      ring2Ref.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.6, 0.015, 8, 80]} />
        <meshBasicMaterial
          color="#7000FF"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      <mesh ref={ring2Ref} rotation={[Math.PI / 4, -Math.PI / 4, 0.2]}>
        <torusGeometry args={[1.8, 0.01, 8, 85]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
}

// ─── Full scene ───────────────────────────────────────────────────────────────
function Scene({ mouse }: { mouse: ReturnType<typeof useMouse> }) {
  return (
    <>
      {/* Sun-like key light from upper-left */}
      <directionalLight position={[-4, 3, 5]} intensity={3.5} color="#fcf8f2" />

      {/* Soft purple ambient */}
      <ambientLight intensity={0.2} color="#1e1b4b" />

      {/* Blue-teal rim fill */}
      <pointLight position={[4, -1, -3]} intensity={2.2} color="#38bdf8" />

      {/* Purple accent */}
      <pointLight position={[-2, -3, 2]} intensity={1.8} color="#7000FF" />

      <Planet mouse={mouse} />

      {/* Orbiting Satellites */}
      <Satellite radius={1.4} speed={0.12} color="#38bdf8" tilt={0.4} initialAngle={0} />
      <Satellite radius={2.0} speed={-0.08} color="#7000FF" tilt={-0.3} initialAngle={Math.PI} />

      {/* Solid Energy Rings */}
      <EnergyRings />

      {/* Orbital debris rings */}
      <OrbitalRing radius={1.55} count={140} speed={0.15} color="#818cf8" size={0.015} />
      <OrbitalRing radius={2.15} count={90}  speed={0.05}  color="#38bdf8" size={0.008} />
    </>
  );
}

// ─── Canvas wrapper with scroll-responsive rendering optimization ──────────────
export default function PlanetScene() {
  const mouse = useMouse();
  const [isVisible, setIsVisible] = useState(true);
  const { recruiterMode } = useSystem();

  useEffect(() => {
    const handleScroll = () => {
      // Pause drawing and rendering when scrolled out of view to optimize CPU/GPU
      setIsVisible(window.scrollY < 850);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || recruiterMode) {
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          left: '38%',
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        left: '38%',
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 3.8], fov: 52 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
