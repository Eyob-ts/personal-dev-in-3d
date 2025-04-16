import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { Text, Html, Float, Environment, PresentationControls, useGLTF, ContactShadows, Preload } from "@react-three/drei";
import Loader from "../Loader"; // Import the loader

const MacBookModel = ({ setLoading, isMobile }) => {
  const { scene } = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf");
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  useEffect(() => {
    if (scene) {
      setLoading(false); // Hide global loader when 3D model loads
    }
  }, [scene, setLoading]);

  return (
    <PresentationControls
    global
    rotation={[0.13, 0.1, 0]} // Initial rotation
    polar={[-0.2, 0.2]} // Restrict tilt on X-axis
    azimuth={[-0.5, 0.5]} // Restrict Y-axis rotation
    config={{ mass: 2, tension: 400 }}
    >
      <Float rotationIntensity={0.2}>
        <rectAreaLight width={2.5} height={1.65} color={"#ff6900"} rotation={[0.1, Math.PI, 0]} position={[0, 0.55, -1.15]} />

        <primitive object={scene} scale={isMobile ? 1 : 1.5} position={isMobile ? [0, -3.25, -2.2] : [0, -3.25, -1.5]}>
          <Html 
          transform distanceFactor={1.17} 
          position={[0, 1.56, -1.4]} 
          rotation-x={-0.256}
          
          >
            {!isIframeLoaded && (
              <div className="flex items-center justify-center w-[1024px] h-[670px] bg-black">
                <span className="text-white text-lg animate-pulse">Loading website...</span>
              </div>
            )}
            <iframe
              className="w-[1024px] h-[670px] border-none"
              src="https://onesamket.com/en"
              onLoad={() => setIsIframeLoaded(true)}
              style={{ display: isIframeLoaded ? "block" : "none",}}
            />
          </Html>
        </primitive>

        <Text font="./Bangers-Regular.ttf" 
        fontSize={0.5} 
        position={[3, -0.75, 0.75]} 
        rotation-y={-1.25} 
        maxWidth={2} 
        textAlign="center"
        className=' relative z-50'>
          
         My ongoing project
        </Text>
      </Float>
    </PresentationControls>
  );
};

const MacBookComputer = () => {
  const [isLoading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(max-width: 768px)");
      setIsMobile(mediaQuery.matches);

      const handleMediaQueryChange = (event) => {
        setIsMobile(event.matches);
      };

      mediaQuery.addEventListener("change", handleMediaQueryChange);
      return () => {
        mediaQuery.removeEventListener("change", handleMediaQueryChange);
      };
    }
  }, []);

  return (
    <div className="relative w-full h-screen">
      {isLoading && <Loader />} {/* Global loader while model loads */}
      <Canvas style={{ touchAction: "none" }}>
        <Environment preset="city" />
        <Preload all /> {/* Preload assets */}
        <MacBookModel isMobile={isMobile} setLoading={setLoading} />
        <ContactShadows position-y={-1.4} opacity={0.4} blur={2.4} />
      </Canvas>
    </div>
  );
};

// Preload the model before it's needed
useGLTF.preload("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf");

export default MacBookComputer;


