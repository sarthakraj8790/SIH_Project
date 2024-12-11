import React, { useCallback } from 'react';
import { loadSlim } from 'tsparticles-slim';
import Particles from 'react-particles';
import type { Engine } from 'tsparticles-engine';

export default function ParticleEffect() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="chatbot-particles"
      init={particlesInit}
      options={{
        particles: {
          number: {
            value: 8,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#6366f1"
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "repulse"
            },
            resize: true
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4
            }
          }
        },
        retina_detect: true,
        background: {
          color: {
            value: "transparent"
          }
        },
        fullScreen: {
          enable: false,
          zIndex: 0
        }
      }}
      className="absolute inset-0 -z-10"
    />
  );
}