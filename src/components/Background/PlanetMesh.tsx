import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlanetMeshProps {
  position: [number, number, number];
  color: string;
  size: number;
  glowIntensity?: number;
  isPulsating?: boolean;
}

export function PlanetMesh({ 
  position, 
  color, 
  size, 
  glowIntensity = 1,
  isPulsating = false 
}: PlanetMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && glowRef.current) {
      meshRef.current.rotation.y += 0.005;
      
      if (isPulsating) {
        const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.1;
        meshRef.current.scale.setScalar(scale);
        glowRef.current.scale.setScalar(scale * 1.2);
      }
    }
  });

  return (
    <group position={position}>
      {/* Planet core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshPhongMaterial 
          color={color}
          shininess={30}
        />
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef} scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3 * glowIntensity}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}