
// import { useEffect, useState } from "react";
// import { Particles, initParticlesEngine } from "@tsparticles/react";
// import { loadSlim } from "@tsparticles/slim"; // <-- Must import!

// const ParticleBackground = () => {
//   const [init, setInit] = useState(false);

//   useEffect(() => {
//     console.log("Initializing particles..."); // Debug
//     initParticlesEngine(async (engine) => {
//       try {
//         await loadSlim(engine);
//         console.log("Engine loaded successfully!"); // Debug
//       } catch (error) {
//         console.error("Failed to load engine:", error); // Debug
//       }
//     }).then(() => {
//       console.log("Particles ready!"); // Debug
//       setInit(true);
//     });
//   }, []);

//   if (!init) {
//     console.log("Waiting for initialization..."); // Debug
//     return null;
//   }

//   return (
//     <Particles
//       id="tsparticles"
//       options={{
//         background: { color: "#162138" },
//         fpsLimit: 120,
//         interactivity: {
//           events: {
//             onClick: { enable: true, mode: "push" },
//             onHover: { enable: true, mode: "repulse" },
//           },
//           modes: {
//             push: { quantity: 4 },
//             repulse: { distance: 90 },
//           },
//         },
//         particles: {
//           color: { value: "#ffffff" },
//           links: {
//             color: "#ffffff",
//             distance: 150,
//             enable: true,
//             opacity: 0.5,
//             width: 1,
//           },
//           move: { enable: true },
//           number: {
//             density: { enable: true, area: 800 },
//             value: 250, // <-- Ensure particles exist!
//           },
//           opacity: { value: 0.5 },
//           size: { value: { min: 1, max: 3 } },
//         },
//       }}
//       style={{
//         position: "absolute",
//         inset: 0,
//         zIndex: -1,
//         backgroundColor: "#162138", // Fallback
//       }}
//     />
//   );
// };

// export default ParticleBackground;
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
          background: { color: "transparent" },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: true, mode: "repulse" },
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 200 },
            },
          },
          particles: {
            color: { value: "#ffffff" },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: { 
              enable: true,
              outModes: {
                default: "destroy" // This prevents particles from leaking
              }
            },
            number: {
              density: { enable: true, area: 800 },
              value: 60,
            },
            opacity: { value: 0.5 },
            size: { value: { min: 1, max: 3 } },
          },
        }}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

export default ParticleBackground;