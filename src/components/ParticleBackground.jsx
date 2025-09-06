/* ParticleBackground.jsx */
import { useEffect, useState, useCallback } from "react";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine"; // for shower helper

export default function ParticleBackground() {
  const [init, setInit] = useState(false);

  /* ---------- init engine ---------- */
  useEffect(() => {
    let m = true;
    initParticlesEngine(async (e) => loadSlim(e)).then(() => m && setInit(true));
    return () => (m = false);
  }, []);

  /* ---------- meteor-shower helper ---------- */
  const meteorShower = useCallback(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    for (let i = 0; i < 30; i++) {
      tsParticles.addEmitter("space-particles", {
        position: { x: Math.random() * W, y: -20 },
        rate: { delay: 0.05, quantity: 1 },
        life: { duration: 0.2, count: 1 },
        particles: {
          shape: "star",
          size: 2,
          color: ["#ffffff", "#ffd54f"],
          opacity: { start: 1, end: 0 },
          life: { duration: 2 },
          move: {
            speed: { min: 5, max: 8 },
            direction: 90 + Math.random() * 40, // 90-130°
            outModes: "destroy",
            trail: { enable: true, length: 12 }
          }
        }
      });
    }
  }, []);

  /* ---------- day-night cycle ---------- */
  useEffect(() => {
    let phase = 0;
    const id = setInterval(() => {
      phase = (phase + 1) % 360;
      const bg = `hsl(${220 + phase * 0.2}, 40%, ${6 + phase * 0.05}%)`; // darker
      const canv = document.querySelector("#space-particles canvas");
      canv?.style.setProperty("background", bg);
    }, 300);
    return () => clearInterval(id);
  }, []);

  /* ---------- warp-drive easter-egg ---------- */
  useEffect(() => {
    let warp = false;
    const onWheel = (e) => {
      if (!e.shiftKey) return;
      warp = true;
      const opt = tsParticles.domItem(0)?.options;
      if (opt) {
        opt.particles.move.speed = { min: 10, max: 20 };
        opt.particles.move.direction = "top";
        opt.particles.move.trail.length = 40;
      }
      setTimeout(() => {
        warp = false;
        if (opt) {
          opt.particles.move.speed = { min: 0.2, max: 0.8 };
          opt.particles.move.direction = "none";
          opt.particles.move.trail.length = 0;
        }
      }, 1500);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  if (!init) return null;

  return (
    <>
      <button
        onClick={meteorShower}
        className="fixed top-4 left-4 z-50 btn-primary"
      >
       
      </button>

      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <Particles
          id="space-particles"
          options={{
            background: { color: "#040d18ff" }, // darker than #0d1b2a
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: { enable: true, mode: "trail" },
                onHover: { enable: true, mode: "bubble" }
              },
              modes: {
                trail: {
                  delay: 0.005,
                  quantity: 2,
                  particles: {
                    color: "#64b5f6",
                    size: 1,
                    opacity: 1,
                    life: { duration: 4 },
                    links: {
                      enable: true,
                      distance: 120,
                      color: "#64b5f6",
                      opacity: 0.6,
                      width: 0.8
                    }
                  }
                },
                bubble: {
                  distance: 36,
                  size: 0,
                  particles: {
                    number: { value: 8 },
                    color: "#ffffff",
                    size: 1,
                    opacity: 1,
                    life: { duration: 0.8 },
                    move: { speed: 4, direction: "outside", outModes: "destroy" }
                  }
                }
              }
            },
            particles: {
              color: { value: ["#ffffff", "#ffd700", "#87ceeb", "#ff6b6b", "#4ecdc4"] },
              links: { enable: false },
              move: {
                enable: true,
                speed: { min: 0.2, max: 0.8 },
                direction: "none",
                outModes: "out"
              },
              number: { density: { enable: true, area: 800 }, value: 150 },
              opacity: {
                value: { min: 0.3, max: 1 },
                animation: { enable: true, speed: 2, sync: false }
              },
              size: { value: { min: 1, max: 2 }, animation: { enable: true, speed: 2, sync: false } },
              shape: { type: "star", options: { star: { sides: 5, inset: 2 } } },
              rotate: { value: { min: 0, max: 360 }, animation: { enable: true, speed: { min: 5, max: 15 }, sync: false } },
              twinkle: { particles: { enable: true, frequency: 0.005, opacity: 0.3 } },
              zIndex: { value: { min: 0, max: 100 }, opacityRate: 0.5, sizeRate: 0.5, velocityRate: 0.5 }
            },
            /* ---------- nebula layer ---------- */
            emitters: [
              {
                position: { x: 50, y: 50 },
                rate: { delay: 0.25, quantity: 1 },
                size: { width: 100, height: 100 },
                life: { duration: 0, count: 0 },
                particles: {
                  number: { value: 12 },
                  shape: "circle",
                  size: { value: 250, random: { enable: true, minimumValue: 150 } },
                  opacity: { value: 0.06, random: { enable: true, minimumValue: 0.03 } },
                  color: { value: ["#0d47a1", "#6a1b9a", "#c2185b"] },
                  move: { enable: true, speed: 0.2, direction: "none", outModes: "bounce", attract: { enable: true, rotateX: 300, rotateY: 300 } }
                }
              },
              /* ---------- fixed shooting-star emitter ---------- */
              {
                position: { x: -10, y: Math.random() * 50 },
                rate: { delay: 4, quantity: 1 },
                life: { duration: 0, count: 0 },
                particles: {
                  shape: "star",
                  size: 2,
                  color: ["#ffffff", "#ffd54f"],
                  opacity: { start: 1, end: 0 },
                  life: { duration: 2.5 },
                  move: {
                    speed: 6,
                    direction: 110,
                    outModes: "destroy",
                    trail: { enable: true, length: 20 }
                  }
                }
              }
            ],
            detectRetina: true,
            motion: { reduce: { factor: 4, value: true } }
          }}
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </>
  );
}