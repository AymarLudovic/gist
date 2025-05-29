import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components';

const CallToActionSection: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctaRef.current || !titleRef.current || !buttonRef.current) return;

    let ctx = gsap.context(() => {
      const titleWords = titleRef.current.querySelectorAll('.word');

      // Staggered reveal for CTA title
      gsap.fromTo(titleWords,
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          stagger: 0.05,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            // markers: true,
          }
        }
      );

      // Reveal button with a slight delay
      gsap.fromTo(buttonRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: buttonRef.current,
            start: "top 90%",
            // markers: true,
          },
          delay: 0.5,
        }
      );

      // Parallax effect on the entire CTA section
      gsap.to(ctaRef.current, {
        backgroundPositionY: "20%", // Moves background faster than scroll
        ease: "none",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          // markers: true,
        },
      });

    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={ctaRef}
      className="snap-section relative bg-gradient-to-br from-electric-blue to-purple-glow py-32 px-4 md:py-40 text-center text-white overflow-hidden will-change-transform"
      style={{
        backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')`, // Subtle texture
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-deep-black bg-opacity-70 backdrop-blur-sm"></div> {/* Overlay for contrast */}

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 ref={titleRef} className="font-display font-bold text-hero-lg md:text-hero-xl leading-tight mb-12 uppercase overflow-hidden">
          {"Ready to Transform".split(' ').map((word, index) => (
            <span key={index} className="word inline-block will-change-transform">
              {word}&nbsp;
            </span>
          ))}
          <br className="hidden md:block"/>
          {"Your Crypto Journey?".split(' ').map((word, index) => (
            <span key={index} className="word inline-block text-vibrant-green will-change-transform">
              {word}&nbsp;
            </span>
          ))}
        </h2>
        <div ref={buttonRef} className="will-change-transform">
          <Button size="lg" variant="primary" className="shadow-glow-lg text-lg px-12 py-5">
            Join CryptoForge Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;