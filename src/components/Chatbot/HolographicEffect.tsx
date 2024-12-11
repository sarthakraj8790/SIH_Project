import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

function HolographicMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshPhongMaterial
        color="#6366f1"
        transparent
        opacity={0.6}
        wireframe
      />
    </mesh>
  );
}

export default function HolographicEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <HolographicMesh />
      </Canvas>
    </div>
  );
}