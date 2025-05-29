import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import logo from '@/assets/svg/logo.svg';
import { Button } from '@/components';

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!headerRef.current) return;

    // Header reveal animation on scroll
    gsap.from(headerRef.current, {
      yPercent: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 2.5, // After preloader
    });

    // GSAP context for menu animations
    let ctx = gsap.context(() => {
      if (!navRef.current || !burgerRef.current) return;

      const navLinks = gsap.utils.toArray<HTMLElement>(".nav-link");
      const menuTimeline = gsap.timeline({ paused: true, reversed: true }); // Start reversed (closed)

      // Animation for menu opening
      menuTimeline
        .to(navRef.current, {
          clipPath: 'circle(100% at 50% 50%)', // Expand from center
          opacity: 1,
          duration: 0.8,
          ease: "power3.inOut",
        })
        .fromTo(navLinks,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" },
          "-=0.4" // Overlap with nav expansion
        );

      // Burger icon animation
      const burgerTl = gsap.timeline({ paused: true });
      burgerTl
        .to(burgerRef.current.children[0], { rotate: 45, y: 7, duration: 0.3 }, "start")
        .to(burgerRef.current.children[1], { opacity: 0, duration: 0.3 }, "start")
        .to(burgerRef.current.children[2], { rotate: -45, y: -7, duration: 0.3 }, "start");

      if (menuOpen) {
        menuTimeline.play();
        burgerTl.play();
      } else {
        menuTimeline.reverse();
        burgerTl.reverse();
      }
    }, navRef); // Scope animations to navRef

    return () => ctx.revert(); // Clean up GSAP context
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 p-6 lg:p-8 flex items-center justify-between bg-deep-black bg-opacity-70 backdrop-blur-md border-b border-dark-gray"
    >
      <div className="flex items-center gap-4">
        <a href="#hero" className="flex items-center group cursor-hover">
          <img src={logo} alt="CryptoForge Logo" className="w-10 h-10 will-change-transform group-hover:rotate-12 group-hover:scale-105 transition-transform duration-300" />
          <span className="ml-3 text-white text-xl font-display font-bold hidden md:block">CryptoForge</span>
        </a>
      </div>

      <nav className="hidden lg:flex items-center space-x-12 font-alt-sans text-lg">
        <a href="#features" className="nav-link text-light-gray hover:text-electric-blue transition-colors duration-300 cursor-hover">Features</a>
        <a href="#how-it-works" className="nav-link text-light-gray hover:text-electric-blue transition-colors duration-300 cursor-hover">How It Works</a>
        <a href="#testimonials" className="nav-link text-light-gray hover:text-electric-blue transition-colors duration-300 cursor-hover">Testimonials</a>
        <a href="#pricing" className="nav-link text-light-gray hover:text-electric-blue transition-colors duration-300 cursor-hover">Pricing</a>
      </nav>

      <div className="hidden lg:block">
        <Button onClick={() => console.log("Login clicked")}>Login</Button>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          ref={burgerRef}
          onClick={toggleMenu}
          className="relative w-8 h-6 flex flex-col justify-between items-center cursor-hover z-[101]"
          aria-label="Toggle Navigation"
        >
          <span className="block w-full h-0.5 bg-electric-blue transform origin-center transition-transform duration-300"></span>
          <span className="block w-full h-0.5 bg-electric-blue transform origin-center transition-opacity duration-300"></span>
          <span className="block w-full h-0.5 bg-electric-blue transform origin-center transition-transform duration-300"></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        ref={navRef}
        className={`fixed inset-0 bg-deep-black z-50 flex flex-col items-center justify-center space-y-8 lg:hidden transition-opacity duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ clipPath: menuOpen ? 'circle(100% at 50% 50%)' : 'circle(0% at 50% 50%)' }}
      >
        <nav className="flex flex-col items-center space-y-6 text-2xl font-display font-bold">
          <a onClick={toggleMenu} href="#features" className="nav-link text-white hover:text-electric-blue transition-colors duration-300 cursor-hover">Features</a>
          <a onClick={toggleMenu} href="#how-it-works" className="nav-link text-white hover:text-electric-blue transition-colors duration-300 cursor-hover">How It Works</a>
          <a onClick={toggleMenu} href="#testimonials" className="nav-link text-white hover:text-electric-blue transition-colors duration-300 cursor-hover">Testimonials</a>
          <a onClick={toggleMenu} href="#pricing" className="nav-link text-white hover:text-electric-blue transition-colors duration-300 cursor-hover">Pricing</a>
        </nav>
        <Button onClick={() => { console.log("Login clicked"); toggleMenu(); }}>Login</Button>
      </div>
    </header>
  );
};

export default Header;