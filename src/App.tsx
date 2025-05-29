import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomCursor, Preloader, Header, Footer, HeroSection, FeaturesSection, HowItWorksSection, TestimonialsSection, PricingSection, CallToActionSection, BackgroundCanvas } from '@/components';
import { useCustomCursor, useGsapAnimations } from '@/hooks';

// Register GSAP plugins in main.tsx or here, but ensure it's only once
// gsap.registerPlugin(ScrollTrigger, Flip); // Already in main.tsx

const App: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { cursorRef, followerRef } = useCustomCursor();
  const [loading, setLoading] = useState(true);

  // Use the hook to register GSAP plugins and set up global behaviors
  useGsapAnimations();

  useEffect(() => {
    // Initial GSAP setup for overall page transitions / snapping
    if (mainRef.current) {
      ScrollTrigger.defaults({
        // For smoother debugging, you can add markers: true
      });

      // Example of snap scrolling for main sections
      // This will make the scroll snap to the start of each section.
      // Adjust behavior based on desired user experience.
      const sections = gsap.utils.toArray<HTMLElement>(".snap-section");
      sections.forEach(section => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top", // Ensure it pins if section is smaller than viewport
          snap: {
            snapTo: 0, // Snap to the start of the section
            duration: 0.5,
            ease: "power2.inOut",
            delay: 0.1,
          },
          // On small screens, snap can be jarring, disable or adjust
          // matchMedia: {
          //   "(min-width: 768px)": () => {
          //     ScrollTrigger.create({
          //       trigger: section,
          //       start: "top top",
          //       snap: 0,
          //       ease: "power2.inOut"
          //     });
          //   }
          // }
        });
      });


      // GSAP Context for isolated animations if needed
      // let ctx = gsap.context(() => {
      //   // Specific animations here
      // }, mainRef);

      // return () => ctx.revert();
    }
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col dark:bg-deep-black text-white grainy-bg">
      <Preloader setLoading={setLoading} />
      {loading && <div className="fixed inset-0 z-[100] bg-deep-black flex items-center justify-center"></div>}

      <CustomCursor cursorRef={cursorRef} followerRef={followerRef} />

      <Header />
      <main ref={mainRef} className="flex-grow">
        <BackgroundCanvas /> {/* Simulated WebGL background */}
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;