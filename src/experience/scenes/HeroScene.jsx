import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useExperience } from "../../hooks/useExperience";

const cluster = [
  { position: [-1.1, -0.15, 0], scale: 0.82, rotation: [0.2, 0.5, -0.2] },
  { position: [0, 0.08, 0.08], scale: 1, rotation: [-0.4, 0.25, 0.35] },
  { position: [1.05, -0.2, -0.05], scale: 0.72, rotation: [0.35, -0.55, 0.1] },
  { position: [-0.35, 0.82, -0.18], scale: 0.58, rotation: [-0.15, 0.8, -0.4] },
  { position: [0.45, -0.92, 0.18], scale: 0.62, rotation: [0.65, -0.2, 0.5] },
];

const PremiumCluster = () => {
  const group = useRef();
  const light = useRef();
  const { pointer, isLowTier, isHighTier } = useExperience();
  const materialProps = useMemo(
    () => ({
      roughness: isLowTier ? 0.28 : 0.12,
      metalness: isLowTier ? 0.82 : 0.95,
      color: "#d8e4ef",
      envMapIntensity: isHighTier ? 1.5 : 0.95,
    }),
    [isHighTier, isLowTier]
  );

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    const px = pointer.current.x;
    const py = pointer.current.y;

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, px * 0.28, 0.045);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -py * 0.18, 0.045);
      group.current.position.y = Math.sin(elapsed * 0.75) * 0.12;
    }

    if (light.current) {
      light.current.position.x = THREE.MathUtils.lerp(light.current.position.x, px * 3.2, 0.08);
      light.current.position.y = THREE.MathUtils.lerp(light.current.position.y, py * 2.2 + 1.2, 0.08);
    }
  });

  return (
    <>
      <pointLight ref={light} position={[0, 1.4, 3.2]} intensity={isLowTier ? 4 : 7} color="#d7f5ff" />
      <group ref={group} position={[0.85, -0.05, 0]}>
        {cluster.map((item, index) => (
          <Float
            key={index}
            speed={0.8 + index * 0.08}
            rotationIntensity={isLowTier ? 0.08 : 0.18}
            floatIntensity={isLowTier ? 0.08 : 0.18}
          >
            <mesh position={item.position} scale={item.scale} rotation={item.rotation}>
              <icosahedronGeometry args={[1, isHighTier ? 4 : 2]} />
              {isHighTier ? (
                <MeshTransmissionMaterial
                  backside
                  thickness={0.35}
                  transmission={0.28}
                  roughness={0.08}
                  metalness={0.45}
                  chromaticAberration={0.03}
                  anisotropy={0.2}
                  distortion={0.08}
                  color="#dfefff"
                />
              ) : (
                <meshStandardMaterial {...materialProps} />
              )}
            </mesh>
          </Float>
        ))}
      </group>
    </>
  );
};

const CameraRig = () => {
  const { camera } = useThree();
  const { pointer, isLowTier } = useExperience();

  useFrame(() => {
    if (isLowTier) return;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.current.x * 0.34, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.current.y * 0.18, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const HeroScene = () => {
  const { deviceTier, isLowTier } = useExperience();
  const dpr = deviceTier === "high" ? [1, 1.5] : [1, 1.15];

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={dpr} gl={{ antialias: !isLowTier }}>
      <color attach="background" args={["#020305"]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[-3, 4, 4]} intensity={1.4} color="#ffffff" />
      <CameraRig />
      <PremiumCluster />
      {!isLowTier && <Environment preset="city" />}
    </Canvas>
  );
};

export default HeroScene;
