import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from '@/assets/svg/logo.svg';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    // Footer parallax effect
    gsap.fromTo(footerRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%", // Start animation when top of footer is 90% in viewport
          end: "top 50%",
          scrub: 1, // Smooth scrub effect
          // markers: true,
        },
      }
    );

    // Parallax for specific elements within the footer (e.g., logo, text)
    const logoElement = footerRef.current.querySelector('.footer-logo');
    if (logoElement) {
      gsap.to(logoElement, {
        y: -50, // Move up slightly
        rotation: 10,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom", // When footer enters from bottom
          end: "bottom top", // When footer leaves at top
          scrub: 0.8, // Slower parallax
        },
      });
    }

    const textElements = gsap.utils.toArray<HTMLElement>(footerRef.current.querySelectorAll('.footer-text'));
    textElements.forEach((el, i) => {
      gsap.to(el, {
        x: (i % 2 === 0 ? 30 : -30), // Alternate direction
        opacity: 0.7,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5 + i * 0.1, // Vary speed slightly
        },
      });
    });

  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-10 bg-dark-gray py-16 px-8 mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 text-light-gray">
        <div className="col-span-full md:col-span-1 flex flex-col items-start mb-8 md:mb-0">
          <img src={logo} alt="CryptoForge Logo" className="w-12 h-12 mb-4 footer-logo will-change-transform" />
          <p className="text-lg font-alt-sans max-w-xs footer-text">
            Leading the decentralized revolution with innovative Web3 solutions.
          </p>
        </div>

        <div className="footer-links">
          <h3 className="text-white text-xl font-display font-semibold mb-6">Explore</h3>
          <ul className="space-y-3">
            <li><a href="#features" className="hover:text-electric-blue transition-colors duration-300 cursor-hover footer-text">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-electric-blue transition-colors duration-300 cursor-hover footer-text">How It Works</a></li>
            <li><a href="#pricing" className="hover:text-electric-blue transition-colors duration-300 cursor-hover footer-text">Pricing</a></li>
            <li><a href="#testimonials" className="hover:text-electric-blue transition-colors duration-300 cursor-hover footer-text">Testimonials</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3 className="text-white text-xl font-display font-semibold mb-6">Company</h3>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-electric-blue transition-colors duration-300 cursor-hover footer-text">About Us</a></li>
            <li><a href="#" className="hover:text-electric-blue transition-colors duration-300 cursor-hover footer-text">Careers</a></li>
            <li><a href="#" className="hover:text-electric-blue transition-colors duration-300 cursor-hover footer-text">Blog</a></li>
            <li><a href="#" className="hover:text-electric-blue transition-colors duration-300 cursor-hover footer-text">Contact</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3 className="text-white text-xl font-display font-semibold mb-6">Legal</h3>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-electric-blue transition-colors duration-300 cursor-hover footer-text">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-electric-blue transition-colors duration-300 cursor-hover footer-text">Terms of Service</a></li>
            <li><a href="#" className="hover:text-electric-blue transition-colors duration-300 cursor-hover footer-text">Disclaimer</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-dark-gray text-center text-light-gray text-sm font-alt-sans">
        <p className="footer-text">&copy; {new Date().getFullYear()} CryptoForge. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;