import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components';
import heroBg from '@/assets/images/hero-bg.webp';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !titleRef.current || !subtitleRef.current || !ctaRef.current || !bgRef.current) return;

    const titleWords = titleRef.current.querySelectorAll('.word');

    let ctx = gsap.context(() => {
      // Ensure elements are initially hidden or positioned for animation
      gsap.set(titleWords, { y: '100%', opacity: 0 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 50 });
      gsap.set(ctaRef.current, { opacity: 0, y: 50 });

      // Main Hero Headline animation (letter by letter reveal)
      const tl = gsap.timeline({ delay: 3, ease: "power3.out" }); // Delayed to play after preloader
      tl.to(titleWords, {
        y: '0%',
        opacity: 1,
        stagger: 0.08,
        duration: 1.2,
        onComplete: () => {
          gsap.to(titleRef.current, {
            '-webkit-text-stroke-width': '1.5px', // Add stroke after reveal
            color: 'transparent',
            duration: 0.8,
            ease: "power2.out",
          });
        }
      })
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.6")
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4");

      // Parallax effect on scroll for the background image
      gsap.to(bgRef.current, {
        yPercent: 20, // Move background up slower than scroll
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          // markers: true,
        },
      });

      // Perspective/Pseudo-3D effect on hero content as you scroll
      gsap.to(heroRef.current.querySelector('.hero-content'), {
        rotationX: -10,
        scale: 0.9,
        opacity: 0.8,
        transformOrigin: "center top",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

    }, heroRef); // GSAP context to limit animations to this component

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="snap-section relative flex flex-col items-center justify-center min-h-screen text-white text-center p-8 overflow-hidden bg-deep-black"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.5) blur(3px)', // Darken and blur the background
        }}
      ></div>

      <div className="relative z-10 hero-content perspective-container">
        <h1
          ref={titleRef}
          className="font-display font-bold text-hero-xl md:text-hero-xl leading-none uppercase mb-6 relative overflow-hidden text-stroke-white will-change-transform"
          style={{ lineHeight: 0.9 }}
        >
          {"Ignite Your".split(' ').map((word, index) => (
            <span key={index} className="word inline-block will-change-transform">
              {word}&nbsp;
            </span>
          ))}
          <br className="hidden md:block"/>
          {"Web3 Future".split(' ').map((word, index) => (
            <span key={index} className="word inline-block will-change-transform text-gradient-purple-blue">
              {word}&nbsp;
            </span>
          ))}
        </h1>
        <p ref={subtitleRef} className="font-alt-sans text-xl md:text-2xl max-w-4xl mx-auto mb-12 text-light-gray opacity-0 will-change-transform">
          CryptoForge offers cutting-edge decentralized finance and investment solutions, built for the next generation of digital assets. Secure, smart, and scalable.
        </p>
        <div ref={ctaRef} className="opacity-0 will-change-transform">
          <Button size="lg" className="mr-4">Get Started Now</Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;