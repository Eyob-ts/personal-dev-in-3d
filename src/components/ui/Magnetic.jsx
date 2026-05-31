import { createElement, useEffect, useRef } from "react";
import { useExperience } from "../../hooks/useExperience";

const Magnetic = ({
  as: Component = "div",
  children,
  className = "",
  strength = 10,
  radius = 170,
  disabled = false,
  ...props
}) => {
  const ref = useRef(null);
  const { pointer, isLowTier } = useExperience();

  useEffect(() => {
    if (disabled || isLowTier) return undefined;

    let frame = 0;

    const tick = () => {
      const element = ref.current;

      if (element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const cursorX = ((pointer.current.x + 1) / 2) * window.innerWidth;
        const cursorY = ((-pointer.current.y + 1) / 2) * window.innerHeight;
        const distanceX = cursorX - centerX;
        const distanceY = cursorY - centerY;
        const distance = Math.hypot(distanceX, distanceY);

        if (distance < radius) {
          const pull = 1 - distance / radius;
          const x = (distanceX / radius) * strength * pull;
          const y = (distanceY / radius) * strength * pull;
          element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        } else {
          element.style.transform = "translate3d(0, 0, 0)";
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    const element = ref.current;

    return () => {
      cancelAnimationFrame(frame);
      if (element) element.style.transform = "";
    };
  }, [disabled, isLowTier, pointer, radius, strength]);

  return createElement(
    Component,
    {
      ref,
      className: `transition-transform duration-300 ease-out will-change-transform ${className}`,
      ...props,
    },
    children
  );
};

export default Magnetic;
