import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import {
  Text,
  Html,
  Float,
  PresentationControls,
  ContactShadows,
  Preload,
} from "@react-three/drei";
import Loader from "../Loader"; // Your custom loader

const MacBookModel = ({ setLoading, isMobile }) => {
  // The GLTF model was hosted remotely and sometimes fails to resolve
  // (net::ERR_NAME_NOT_RESOLVED). To avoid the portfolio hanging when
  // the host is down, we no longer fetch the remote model here. Instead
  // render a lightweight placeholder. If you want to re-enable the
  // model later, restore the useGLTF call and the primitive below.
  // no iframe/model loading state needed for placeholder

  // Make sure loader is dismissed even when the model isn't loaded.
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <PresentationControls
      global
      rotation={[0.13, 0.1, 0]}
      polar={[-0.2, 0.2]}
      azimuth={[-0.5, 0.5]}
      config={{ mass: 2, tension: 400 }}
    >
      <Float rotationIntensity={0.2}>
        <rectAreaLight
          width={2.5}
          height={1.65}
          color={"#ff6900"}
          rotation={[0.1, Math.PI, 0]}
          position={[0, 0.55, -1.15]}
        />

        {/* The remote GLTF was removed to prevent blocking when the host is down. */}
        <group
          scale={isMobile ? 1 : 1.5}
          position={isMobile ? [0, -3.25, -2.2] : [0, -3.25, -1.5]}
        >
          {/* Simple placeholder mesh instead of the external model */}
          <mesh>
            <boxGeometry args={[1.6, 0.1, 1]} />
            <meshStandardMaterial color="#111827" />
          </mesh>

          <Html
            transform
            distanceFactor={1.17}
            position={[0, 0.7, 0]}
            rotation-x={-0.256}
          >
            <div className="flex items-center justify-center w-[512px] h-[320px] bg-black">
              <span className="text-gray-100 text-lg text-center">
                3D model unavailable — host down. Placeholder shown.
              </span>
            </div>
          </Html>
        </group>

        {/* ✅ Responsive Text */}
        <Text
          font="./Bangers-Regular.ttf"
          fontSize={isMobile ? 0.2 : 0.3}
          position={isMobile ? [1.6, -1.5, 0.1] : [2.7, -0.7, 0.7]}
          rotation-y={-1.25}
          maxWidth={isMobile ? 1 : 4}
          textAlign="center"
        >
          👈Go on,give it a spin{"\n"}
          just don’t drop it💥
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
      {isLoading && <Loader />}
      <Canvas style={{ touchAction: "none" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <Preload all />
        <MacBookModel isMobile={isMobile} setLoading={setLoading} />
        <ContactShadows position-y={-1.4} opacity={0.4} blur={2.4} />
      </Canvas>
    </div>
  );
};

// The GLTF preload was removed because the remote file is unreliable.

export default MacBookComputer;
