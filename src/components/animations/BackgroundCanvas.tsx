import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    // Simulate WebGL with CSS gradients and animation
    // In a real scenario, this would be a Three.js or WebGL canvas.
    // For now, we'll create a mesmerizing background with CSS and GSAP.

    gsap.to(canvasElement, {
      backgroundPosition: "200% 200%",
      duration: 30, // Slow, continuous animation
      ease: "none",
      repeat: -1,
      yoyo: true,
      // Apply a subtle rotation for pseudo-3D feel
      rotation: 360,
      scale: 1.05,
      filter: 'blur(10px) brightness(0.8)', // Subtle blur for depth
      // Using willChange for performance
      willChange: 'background-position, transform, filter'
    });

    // Animate opacity or another property on scroll for interaction
    gsap.to(canvasElement, {
      opacity: 0.6,
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: self => {
          // Subtle color shift based on scroll position
          const progress = self.progress;
          const r = Math.floor(74 + (166 - 74) * progress); // From electric-blue to purple-glow R
          const g = Math.floor(144 + (74 - 144) * progress);  // G
          const b = Math.floor(226 + (226 - 226) * progress); // B
          canvasElement.style.setProperty('--gradient-start', `rgb(${r},${g},${b})`);
        }
      }
    });

    // You could also add dynamic mouse interactions here
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      gsap.to(canvasElement, {
        backgroundPositionX: `${x * 100}%`,
        backgroundPositionY: `${y * 100}%`,
        duration: 2,
        ease: "power2.out",
        overwrite: 'auto'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.killTweensOf(canvasElement);
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-50 will-change-transform"
      style={{
        background: `linear-gradient(45deg, var(--gradient-start, #4A90E2) 0%, #A64AE2 30%, #50E3C2 70%, #F8E71C 100%)`,
        backgroundSize: '200% 200%',
        animation: 'gradient-shift 10s ease infinite',
        filter: 'blur(5px) brightness(0.9)',
        transform: 'translateZ(0)', // For performance optimization
      }}
    ></div>
  );
};

export default BackgroundCanvas;