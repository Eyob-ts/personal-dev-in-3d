import { useRef } from "react";
import { useExperience } from "../../hooks/useExperience";

const TiltCard = ({
  children,
  className = "",
  maxRotation = 5,
  scale = 1.02,
  disabled = false,
  ...props
}) => {
  const ref = useRef(null);
  const { isLowTier } = useExperience();
  const isDisabled = disabled || isLowTier;

  const handlePointerMove = (event) => {
    if (isDisabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const rotateY = x * maxRotation;
    const rotateX = -y * maxRotation;

    ref.current.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    ref.current.style.setProperty("--tilt-x", `${(x + 0.5) * 100}%`);
    ref.current.style.setProperty("--tilt-y", `${(y + 0.5) * 100}%`);
  };

  const handlePointerLeave = () => {
    if (!ref.current) return;

    ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    ref.current.style.setProperty("--tilt-x", "50%");
    ref.current.style.setProperty("--tilt-y", "50%");
  };

  return (
    <div
      ref={ref}
      className={`relative transform-gpu transition-transform duration-500 ease-out will-change-transform ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      {children}
    </div>
  );
};

export default TiltCard;
