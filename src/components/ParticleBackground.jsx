import { useEffect, useState } from "react";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    let mounted = true;

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      if (mounted) setInit(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (!init) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <Particles
        id="hero-particles"
        options={{
          background: {
            color: "black",
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: { 
                enable: true, 
                mode: ["push", "repulse"] 
              },
              onHover: { 
                enable: true, 
                mode: "connect",
                parallax: { enable: true, force: 60, smooth: 10 }
              },
            },
            modes: {
              push: { 
                quantity: 6,
                particles: {
                  size: {
                    value: { min: 1, max: 3 },
                    animation: {
                      enable: true,
                      speed: 5,
                      sync: true,
                      startValue: "min",
                      destroy: "max"
                    }
                  }
                }
              },
              repulse: { 
                distance: 250, 
                duration: 0.8,
                factor: 100,
                speed: 1,
                maxSpeed: 50,
                easing: "ease-out-expo"
              },
              grab: {
                distance: 250,
                links: { 
                  opacity: 1,
                  color: {
                    value: "#fafafaff"
                  },
                  blink: true,
                  consent: true,
                  width: 2
                },
                lineLinked: {
                  opacity: 0.8
                }
              },
            },
          },
          particles: {
            color: {
              // Each particle picks a random color from this array
              value: ["#7cca4fff", "#000000ff", "#ffffff", "#00b42dff", "#0059ffff"],
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.4,
              width: 1.5,
              blink: true,
              consent: true,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              outModes: { 
                default: "bounce",
                bottom: "bounce",
                left: "bounce",
                right: "bounce",
                top: "bounce"
              },
              trail: {
                enable: true,
                length: 10,
                fill: { color: "#000000" }
              },
            },
            number: {
              density: { 
                enable: true, 
                area: 800 
              },
              value: 60, // Slightly reduced for performance with larger particles
            },
            opacity: {
              value: { min: 0.4, max: 0.9 }, // Increased opacity for better visibility
              animation: {
                enable: true,
                speed: 1.5,
                sync: false,
              },
            },
            size: {
              value: { min: 2, max: 6 }, // Increased size range
              animation: {
                enable: true,
                speed: 3,
                sync: false,
              },
            },
            shape: {
              type: ["circle", "square", "triangle"], // More variety in shapes
              options: {
                polygon: { sides: 5 },
                character: { value: ["❤", "★", "♦", "♠"] }
              }
            },
            wobble: {
              enable: true,
              distance: 10,
              speed: 2
            },
            rotate: {
              value: { min: 0, max: 360 },
              animation: {
                enable: true,
                speed: 5,
                sync: false
              }
            },
            shadow: {
              enable: true,
              color: "#000000",
              blur: 5,
              offset: { x: 3, y: 3 }
            }
          },
          detectRetina: true,
          motion: {
            reduce: {
              factor: 4,
              value: true
            }
          }
        }}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

export default ParticleBackground;