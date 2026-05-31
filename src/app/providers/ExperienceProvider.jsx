import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

const ExperienceContext = createContext(null);

const getDeviceTier = () => {
  if (typeof window === "undefined") return "medium";

  const memory = navigator.deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion || isSmallScreen || memory <= 4 || cores <= 4) return "low";
  if (memory >= 8 && cores >= 8 && window.devicePixelRatio <= 2) return "high";

  return "medium";
};

export const ExperienceProvider = ({ children }) => {
  const pointer = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    velocityX: 0,
    velocityY: 0,
  });
  const [deviceTier, setDeviceTier] = useState(getDeviceTier);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const updateEnvironment = () => {
      setReducedMotion(motionQuery.matches);
      setDeviceTier(getDeviceTier());
    };

    updateEnvironment();
    motionQuery.addEventListener("change", updateEnvironment);
    mobileQuery.addEventListener("change", updateEnvironment);

    return () => {
      motionQuery.removeEventListener("change", updateEnvironment);
      mobileQuery.removeEventListener("change", updateEnvironment);
    };
  }, []);

  useEffect(() => {
    const handlePointerMove = (event) => {
      const nextX = (event.clientX / window.innerWidth) * 2 - 1;
      const nextY = -(event.clientY / window.innerHeight) * 2 + 1;

      pointer.current.velocityX = nextX - pointer.current.targetX;
      pointer.current.velocityY = nextY - pointer.current.targetY;
      pointer.current.targetX = nextX;
      pointer.current.targetY = nextY;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useEffect(() => {
    let frame = 0;

    const tick = () => {
      pointer.current.x += (pointer.current.targetX - pointer.current.x) * 0.08;
      pointer.current.y += (pointer.current.targetY - pointer.current.y) * 0.08;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const value = useMemo(
    () => ({
      pointer,
      deviceTier,
      reducedMotion,
      isLowTier: deviceTier === "low" || reducedMotion,
      isHighTier: deviceTier === "high" && !reducedMotion,
    }),
    [deviceTier, reducedMotion]
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
};

export const useExperience = () => {
  const context = useContext(ExperienceContext);

  if (!context) {
    throw new Error("useExperience must be used inside ExperienceProvider");
  }

  return context;
};
