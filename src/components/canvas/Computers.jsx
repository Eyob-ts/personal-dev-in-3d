import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState, useMemo } from "react";
import {
  Float,
  PresentationControls,
  Stars,
  ContactShadows,
  Trail,
  Preload,
} from "@react-three/drei";
import * as THREE from "three";
import Loader from "../Loader";

/* =========================
   Subtle Background Shooting Star
========================= */
const ShootingStar = ({ delay = 0 }) => {
  const ref = useRef();
  const speed = useMemo(() => Math.random() * 0.05 + 0.03, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (ref.current) {
        ref.current.position.set(
          -18,
          Math.random() * 6 + 4,
          -20 // VERY IMPORTANT → far behind text
        );
      }
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);

  useFrame(() => {
    if (!ref.current) return;

    ref.current.position.x += speed;
    ref.current.position.y -= speed * 0.6;

    if (ref.current.position.x > 18) {
      ref.current.position.set(
        -18,
        Math.random() * 6 + 4,
        -20
      );
    }
  });

  return (
    <Trail
      width={1.2}
      length={6}
      color="#6ffcff"
      attenuation={(t) => t * t}
    >
      <mesh ref={ref}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial
          color="#6ffcff"
          transparent
          opacity={0.7}
        />
      </mesh>
    </Trail>
  );
};

/* =========================
   Smooth Cursor Camera Rig
========================= */
const CameraRig = ({ isMobile }) => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isMobile) return;

    const move = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isMobile]);

  useFrame(() => {
    if (isMobile) return;

    const targetX = mouse.current.x * 0.4;
    const targetY = mouse.current.y * 0.25;

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      targetX,
      0.04
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      targetY,
      0.04
    );

    camera.lookAt(0, 0, 0);
  });

  return null;
};

/* =========================
   Scene Content
========================= */
const SpaceScene = ({ isMobile, setLoading }) => {
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <PresentationControls
      global
      enabled={false} // IMPORTANT: prevents fight with camera
    >
      <Float
        speed={1}
        rotationIntensity={0.15}
        floatIntensity={0.3}
      >
        <Stars
          radius={140}
          depth={80}
          count={isMobile ? 1800 : 6500}
          factor={6}
          saturation={0}
          fade
          speed={0.6}
        />

        {!isMobile && (
          <>
            <ShootingStar delay={2000} />
            <ShootingStar delay={6000} />
            <ShootingStar delay={12000} />
          </>
        )}
      </Float>
    </PresentationControls>
  );
};

/* =========================
   Main Hero Canvas
========================= */
const MacBookComputer = () => {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const cb = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  }, []);

  return (
    <div className="relative w-full h-screen">
      {loading && <Loader />}

      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        style={{ touchAction: "none" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[8, 8, 5]} intensity={1.2} />

        <CameraRig isMobile={isMobile} />

        <SpaceScene
          isMobile={isMobile}
          setLoading={setLoading}
        />

        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.25}
          blur={3}
        />

        <Preload all />
      </Canvas>
    </div>
  );
};

export default MacBookComputer;
