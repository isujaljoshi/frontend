'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface AvatarProps {
  progress?: number;
  isBreathing?: boolean;
  className?: string;
}

function AvatarMesh({ progress = 0, isBreathing = true }: { progress: number; isBreathing: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Breathing animation
      if (isBreathing) {
        const breathScale = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.02;
        meshRef.current.scale.setScalar(breathScale);
      }
      
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Subtle rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  // Calculate colors based on progress
  const getProgressColor = () => {
    if (progress < 0.3) return '#0ea5e9'; // Blue - beginning
    if (progress < 0.6) return '#14b8a6'; // Teal - growing
    if (progress < 0.8) return '#8b5cf6'; // Purple - strong
    return '#ec4899'; // Pink - thriving
  };

  const getGlowIntensity = () => {
    return 0.5 + progress * 0.5; // More progress = more glow
  };

  return (
    <Sphere
      ref={meshRef}
      args={[1, 64, 64]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <MeshDistortMaterial
        color={getProgressColor()}
        attach="material"
        distort={0.3 + progress * 0.2}
        speed={2 + progress}
        roughness={0.1}
        metalness={0.8}
        emissive={getProgressColor()}
        emissiveIntensity={getGlowIntensity()}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
}

function Particles() {
  const points = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
      points.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#0ea5e9"
        size={0.02}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function Avatar({ progress = 0, isBreathing = true, className = '' }: AvatarProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#0ea5e9" intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#8b5cf6" intensity={0.5} />
          
          <AvatarMesh progress={progress} isBreathing={isBreathing} />
          <Particles />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
