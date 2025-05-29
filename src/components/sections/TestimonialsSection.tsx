import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { SectionTitle } from '@/components';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "CryptoForge revolutionized how I manage my crypto assets. The security and ease of use are unparalleled. Truly next-gen!",
    author: "Alex V. (Lead Investor)",
    title: "Crypto Enthusiast",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg", // Placeholder
  },
  {
    id: '2',
    quote: "The analytics tools are incredibly insightful. I can now make informed decisions with confidence, boosting my portfolio significantly.",
    author: "Samantha K. (Hedge Fund Manager)",
    title: "Institutional Trader",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg", // Placeholder
  },
  {
    id: '3',
    quote: "I've been in crypto for years, and CryptoForge is by far the most intuitive and robust platform I've come across. Highly recommended!",
    author: "Marcus T. (Blockchain Developer)",
    title: "Web3 Pioneer",
    avatar: "https://randomuser.me/api/portraits/men/50.jpg", // Placeholder
  },
  {
    id: '4',
    quote: "The smart contract automation has saved me countless hours. It's like having a dedicated team working on my investments 24/7.",
    author: "Jessica L. (Entrepreneur)",
    title: "Innovator & Investor",
    avatar: "https://randomuser.me/api/portraits/women/62.jpg", // Placeholder
  },
  {
    id: '5',
    quote: "Being part of the CryptoForge community is amazing. The support and shared knowledge are invaluable for navigating the crypto space.",
    author: "David R. (Community Leader)",
    title: "Decentralized Advocate",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg", // Placeholder
  },
];

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!carouselRef.current) return;

    let ctx = gsap.context(() => {
      // Basic fade animation for new testimonial
      gsap.fromTo(carouselRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", overwrite: true }
      );

      // Parallax effect on testimonial content on scroll
      gsap.to(carouselRef.current.children, {
        y: -50,
        opacity: 0.7,
        ease: "none",
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          // markers: true,
        }
      });

      // Auto-advance the carousel
      const autoAdvance = setInterval(goToNext, 6000); // Change testimonial every 6 seconds

      return () => clearInterval(autoAdvance);
    }, carouselRef);

    return () => ctx.revert();
  }, [currentIndex, goToNext]);

  return (
    <section id="testimonials" ref={sectionRef} className="snap-section bg-dark-gray py-20 px-4 overflow-hidden">
      <SectionTitle
        title="Voices of Our Community"
        subtitle="Hear what our users are saying about their journey with CryptoForge. Real stories, real impact."
        effect="reveal"
      />

      <div className="relative max-w-4xl mx-auto rounded-3xl shadow-neumorphic-dark bg-deep-black p-8 md:p-12 text-center transform-preserve-3d will-change-transform">
        <div ref={carouselRef} className="min-h-[250px] md:min-h-[180px] flex flex-col justify-center items-center">
          <p className="text-light-gray text-xl md:text-2xl font-alt-sans italic mb-8 relative z-10">
            "{testimonials[currentIndex].quote}"
            <span className="absolute -top-6 -left-8 md:-top-10 md:-left-12 text-7xl md:text-9xl text-electric-blue opacity-10 font-bold">"</span>
            <span className="absolute -bottom-6 -right-8 md:-bottom-10 md:-right-12 text-7xl md:text-9xl text-purple-glow opacity-10 font-bold">"</span>
          </p>
          <div className="flex items-center justify-center relative z-10">
            <img
              src={testimonials[currentIndex].avatar}
              alt={testimonials[currentIndex].author}
              className="w-20 h-20 rounded-full border-4 border-electric-blue object-cover transform-preserve-3d will-change-transform"
              style={{
                boxShadow: '0 0 15px rgba(74, 144, 226, 0.5)',
              }}
            />
            <div className="ml-4 text-left">
              <h4 className="text-white text-xl font-display font-semibold">{testimonials[currentIndex].author}</h4>
              <p className="text-light-gray text-sm">{testimonials[currentIndex].title}</p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-y-0 flex items-center justify-between w-full px-4">
          <button
            onClick={goToPrev}
            className="bg-electric-blue text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 cursor-hover"
            aria-label="Previous Testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button
            onClick={goToNext}
            className="bg-electric-blue text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 cursor-hover"
            aria-label="Next Testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;