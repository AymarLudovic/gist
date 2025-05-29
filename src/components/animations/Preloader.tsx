import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import logo from '@/assets/svg/logo.svg';

interface PreloaderProps {
  setLoading: (isLoading: boolean) => void;
}

const Preloader: React.FC<PreloaderProps> = ({ setLoading }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!preloaderRef.current || !logoRef.current || !textRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setLoading(false);
        document.body.style.overflowY = 'auto'; // Re-enable scroll
      },
    });

    // Initial state: hide scrollbar
    document.body.style.overflowY = 'hidden';

    tl.fromTo(logoRef.current,
      { opacity: 0, scale: 0.5, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(textRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, "-=0.5" // Start before logo finishes
    )
    .to([logoRef.current, textRef.current.children], {
      opacity: 0,
      y: -50,
      scale: 0.8,
      duration: 1,
      ease: "power2.in",
      delay: 0.8, // Wait a bit before fading out
    })
    .to(preloaderRef.current, {
      y: "-100%", // Slide up to hide
      duration: 1.2,
      ease: "power3.inOut",
      onComplete: () => {
        preloaderRef.current?.remove(); // Remove preloader from DOM after animation
      }
    }, "-=0.3"); // Start sliding up slightly before elements fade

    return () => {
      tl.kill();
    };
  }, [setLoading]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 bg-deep-black z-[100] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="flex flex-col items-center">
        <img ref={logoRef} src={logo} alt="CryptoForge Logo" className="w-24 h-24 mb-6 opacity-0 will-change-transform" />
        <div ref={textRef} className="text-white text-3xl font-display font-bold uppercase tracking-wider overflow-hidden">
          <span className="inline-block translate-y-full opacity-0">C</span>
          <span className="inline-block translate-y-full opacity-0">r</span>
          <span className="inline-block translate-y-full opacity-0">y</span>
          <span className="inline-block translate-y-full opacity-0">p</span>
          <span className="inline-block translate-y-full opacity-0">t</span>
          <span className="inline-block translate-y-full opacity-0">o</span>
          <span className="inline-block translate-y-full opacity-0">F</span>
          <span className="inline-block translate-y-full opacity-0">o</span>
          <span className="inline-block translate-y-full opacity-0">r</span>
          <span className="inline-block translate-y-full opacity-0">g</span>
          <span className="inline-block translate-y-full opacity-0">e</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;