import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { PlanetMesh } from './PlanetMesh';

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />

      <PlanetMesh 
        position={[-8, 4, -10]} 
        color="#6366f1" 
        size={2} 
        glowIntensity={1.5}
      />
      
      <PlanetMesh 
        position={[8, -4, -10]} 
        color="#8b5cf6" 
        size={1.6}
        glowIntensity={1.2}
      />
      
      <PlanetMesh 
        position={[0, 6, -16]} 
        color="#ec4899" 
        size={2.4}
        glowIntensity={2}
        isPulsating
      />

      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}