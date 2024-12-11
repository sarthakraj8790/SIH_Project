import React from 'react';
import CosmicBackground from './Background/CosmicBackground';
import AuroraEffect from './Background/AuroraEffect';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <CosmicBackground />
      <AuroraEffect />
    </div>
  );
}