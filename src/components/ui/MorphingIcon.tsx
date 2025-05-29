import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface MorphingIconProps {
  initialPath: string; // SVG path data for initial state
  morphPath: string;   // SVG path data for morphed state
  size?: number;
  color?: string;
  className?: string;
  hoverTrigger?: boolean;
}

const MorphingIcon: React.FC<MorphingIconProps> = ({
  initialPath,
  morphPath,
  size = 40,
  color = '#4A90E2',
  className,
  hoverTrigger = true,
}) => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    if (hoverTrigger) {
      const morphTween = gsap.to(path, {
        attr: { d: morphPath },
        duration: 0.8,
        ease: "power2.inOut",
        paused: true,
      });

      path.closest('svg')?.addEventListener('mouseenter', () => morphTween.play());
      path.closest('svg')?.addEventListener('mouseleave', () => morphTween.reverse());

      return () => {
        path.closest('svg')?.removeEventListener('mouseenter', () => morphTween.play());
        path.closest('svg')?.removeEventListener('mouseleave', () => morphTween.reverse());
        morphTween.kill();
      };
    } else {
      // Example for a non-hover triggered morph (e.g., on scroll or click)
      // You can add different triggers here
    }
  }, [initialPath, morphPath, hoverTrigger]);

  return (
    <svg
      className={`cursor-hover will-change-transform ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24" // Assuming a 24x24 viewBox for the paths
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path ref={pathRef} d={initialPath} fill={color} />
    </svg>
  );
};

export default MorphingIcon;