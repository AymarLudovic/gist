import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export const useCustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.2; // Speed of the follower cursor

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");
    const fxSet = gsap.quickSetter(follower, "x", "px");
    const fySet = gsap.quickSetter(follower, "y", "px");

    const animate = () => {
      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;

      fxSet(pos.x);
      fySet(pos.y);

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      xSet(e.clientX);
      ySet(e.clientY);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, .cursor-hover') || target.tagName === 'A' || target.tagName === 'BUTTON') {
        gsap.to(follower, {
          scale: 1.8,
          opacity: 0.5,
          backgroundColor: 'rgba(74, 144, 226, 0.5)',
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, .cursor-hover') || target.tagName === 'A' || target.tagName === 'BUTTON') {
        gsap.to(follower, {
          scale: 1,
          opacity: 1,
          backgroundColor: 'rgba(74, 144, 226, 0.2)', // Reset to default
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter, true); // Use capture phase
    document.addEventListener("mouseleave", handleMouseLeave, true); // Use capture phase

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, []);

  return { cursorRef, followerRef };
};