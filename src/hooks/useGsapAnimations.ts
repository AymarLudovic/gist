import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
// import { SplitText } from 'gsap/SplitText'; // Club GSAP plugin, usually imported like this

export const useGsapAnimations = () => {
  useEffect(() => {
    // Register GSAP plugins if they haven't been already
    // This hook ensures they are registered once when the app mounts.
    // They are also registered in main.tsx, so this acts as a safeguard.
    if (!gsap.plugins.includes(ScrollTrigger)) {
      gsap.registerPlugin(ScrollTrigger);
    }
    if (!gsap.plugins.includes(Flip)) {
      gsap.registerPlugin(Flip);
    }
    // if (!gsap.plugins.includes(SplitText)) {
    //   gsap.registerPlugin(SplitText);
    // }

    // Set global GSAP defaults
    gsap.defaults({
      ease: "power3.out", // A common smooth easing
      duration: 1.2,
    });

    // Set ScrollTrigger defaults
    ScrollTrigger.defaults({
      start: "top 80%", // Default start for many elements
      toggleActions: "play none none reverse", // Play on enter, reverse on leave back
      // markers: true, // Uncomment for debugging scroll triggers
    });

    // Custom Easing Example
    // You can define custom easing functions for more unique motion.
    // This one accelerates, then decelerates, with a slight bounce.
    gsap.registerEase("bouncy", (p: number) => {
      return 0.9 * Math.sin(p * Math.PI * 2.5) * p * p + p;
    });

    // Clean up GSAP instances on unmount to prevent memory leaks,
    // especially important for complex single-page applications.
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.globalTimeline.clear();
    };
  }, []);
};