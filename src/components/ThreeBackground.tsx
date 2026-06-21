'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useSystem } from '@/src/context/SystemContext';

// ─── 1. Nebula Clouds Builder (Canvas Texture) ──────────────────────────────────
function buildNebulaTexture(color: string): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.3, color + '44');
  gradient.addColorStop(1, 'transparent');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// ─── 2. Floating Holographic Cubes ──────────────────────────────────────────
function HolographicCubes() {
  const groupRef = useRef<THREE.Group>(null!);

  const cubeData = useMemo(() => {
    return Array.from({ length: 15 }, () => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 - 2, // deeper in z
      ] as [number, number, number],
      size: 0.15 + Math.random() * 0.35,
      rotSpeed: [
        (Math.random() - 0.5) * 0.15,
        (Math.random() - 0.5) * 0.15,
        (Math.random() - 0.5) * 0.15,
      ] as [number, number, number],
      driftSpeed: (0.05 + Math.random() * 0.1) * (Math.random() > 0.5 ? 1 : -1),
    }));
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const data = cubeData[i];

      // Rotate
      mesh.rotation.x += data.rotSpeed[0] * delta;
      mesh.rotation.y += data.rotSpeed[1] * delta;
      mesh.rotation.z += data.rotSpeed[2] * delta;

      // Gentle vertical drift
      mesh.position.y += data.driftSpeed * delta;
      if (mesh.position.y > 5) mesh.position.y = -5;
      if (mesh.position.y < -5) mesh.position.y = 5;
    });
  });

  return (
    <group ref={groupRef}>
      {cubeData.map((data, i) => (
        <mesh key={i} position={data.position}>
          <boxGeometry args={[data.size, data.size, data.size]} />
          <meshBasicMaterial
            color="#7000FF"
            wireframe
            transparent
            opacity={0.15 + Math.random() * 0.2}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── 3. Starfield with Parallax Scroll ──────────────────────────────────────────
function BackgroundStarField() {
  const ref = useRef<THREE.Points>(null!);
  const count = 500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 4; // Deeper Z
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.005;
      ref.current.rotation.x += delta * 0.002;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// ─── 4. Nebula Particles ───────────────────────────────────────────────────────
function NebulaClouds() {
  const purpleRef = useRef<THREE.Points>(null!);
  const blueRef = useRef<THREE.Points>(null!);

  const purpleTex = useMemo(() => buildNebulaTexture('#7000FF'), []);
  const blueTex = useMemo(() => buildNebulaTexture('#38bdf8'), []);

  const [purplePos, bluePos] = useMemo(() => {
    const p = new Float32Array(30 * 3);
    const b = new Float32Array(20 * 3);

    for (let i = 0; i < 30; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 8;
      p[i * 3 + 2] = (Math.random() - 0.5) * 4 - 3;
    }
    for (let i = 0; i < 20; i++) {
      b[i * 3] = (Math.random() - 0.5) * 10;
      b[i * 3 + 1] = (Math.random() - 0.5) * 8;
      b[i * 3 + 2] = (Math.random() - 0.5) * 4 - 3;
    }
    return [p, b];
  }, []);

  useFrame((_, delta) => {
    if (purpleRef.current) {
      purpleRef.current.rotation.z += delta * 0.015;
      purpleRef.current.rotation.y += delta * 0.005;
    }
    if (blueRef.current) {
      blueRef.current.rotation.z -= delta * 0.01;
      blueRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <>
      <Points ref={purpleRef} positions={purplePos} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          map={purpleTex}
          alphaMap={purpleTex}
          size={2.5}
          sizeAttenuation
          depthWrite={false}
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <Points ref={blueRef} positions={bluePos} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          map={blueTex}
          alphaMap={blueTex}
          size={3.0}
          sizeAttenuation
          depthWrite={false}
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </>
  );
}

// ─── 5. Animated Energy Beams ─────────────────────────────────────────────────
function EnergyLines() {
  const ref = useRef<THREE.LineSegments>(null!);
  const count = 12;

  const pointsData = useMemo(() => {
    const lines = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 6 - 2;
      const yStart = -5 - Math.random() * 2;
      const length = 2 + Math.random() * 4;

      lines.push({
        x, z,
        yStart,
        length,
        speed: 0.8 + Math.random() * 1.5,
      });
    }
    return lines;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const geo = ref.current.geometry;
    const pos = geo.attributes.position;

    pointsData.forEach((line, i) => {
      // Drift the beam upwards
      line.yStart += line.speed * delta;
      if (line.yStart > 5) {
        line.yStart = -5 - Math.random() * 2;
      }

      // Update segment vertices
      // Vertex A (Bottom of line)
      pos.setXYZ(i * 2, line.x, line.yStart, line.z);
      // Vertex B (Top of line)
      pos.setXYZ(i * 2 + 1, line.x, line.yStart + line.length, line.z);
    });
    pos.needsUpdate = true;
  });

  // Create initial buffer geometry attribute
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 2 * 3); // 2 vertices per line, 3 coords
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial
        color="#38bdf8"
        transparent
        opacity={0.25}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

// ─── 6. Global Parallax & Group Container ─────────────────────────────────────
function ParallaxScene() {
  const groupRef = useRef<THREE.Group>(null!);
  const { fpsLow } = useSystem();

  useEffect(() => {
    const handleScroll = () => {
      if (!groupRef.current) return;
      const scrollY = window.scrollY;
      // Scroll moves background down/up slowly to create depth layers
      groupRef.current.position.y = scrollY * 0.0018;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!groupRef.current) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const mx = (e.clientX - cx) / cx;
      const my = -(e.clientY - cy) / cy;

      // Mouse movements shift background slowly
      groupRef.current.rotation.y = mx * 0.08;
      groupRef.current.rotation.x = my * 0.08;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <group ref={groupRef}>
      <BackgroundStarField />
      {!fpsLow && <NebulaClouds />}
      {!fpsLow && <HolographicCubes />}
      {!fpsLow && <EnergyLines />}
    </group>
  );
}

// ─── 7. Main Wrapper ──────────────────────────────────────────────────────────
export default function ThreeBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-black"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'low-power', alpha: false }}
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#000000']} />
        <ParallaxScene />
      </Canvas>
    </div>
  );
}
