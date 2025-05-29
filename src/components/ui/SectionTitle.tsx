import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  textPosition?: 'left' | 'center' | 'right';
  effect?: 'reveal' | 'parallax' | 'stroke';
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className,
  textPosition = 'center',
  effect = 'reveal',
}) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const titleWords = titleRef.current.querySelectorAll('.word');
    const subtitleElement = subtitleRef.current;

    let ctx = gsap.context(() => {
      // Common animation for title words
      const titleAnimation = gsap.fromTo(titleWords,
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          stagger: 0.05,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            // markers: true,
          }
        }
      );

      // Subtitle animation
      if (subtitleElement) {
        gsap.fromTo(subtitleElement,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: subtitleElement,
              start: "top 90%",
              // markers: true,
            }
          }
        );
      }

      // Specific effects
      if (effect === 'parallax') {
        gsap.to(titleRef.current, {
          y: -100, // Move up relative to scroll
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Parallax speed
          }
        });
      } else if (effect === 'stroke') {
        gsap.to(titleRef.current, {
          '-webkit-text-stroke-width': '2px',
          color: 'rgba(255, 255, 255, 0)',
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 70%",
            end: "top 40%",
            scrub: true,
            // markers: true,
          }
        });
      }
    }, titleRef);

    return () => ctx.revert();
  }, [title, subtitle, effect]);

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={`flex flex-col ${alignClasses[textPosition]} ${className} mb-16 px-4`}>
      <h2
        ref={titleRef}
        className="text-white font-display font-bold text-hero-lg md:text-hero-xl leading-tight uppercase relative overflow-hidden"
        style={{ willChange: 'transform, opacity, -webkit-text-stroke-width, color' }}
      >
        {title.split(' ').map((word, index) => (
          <span key={index} className="word inline-block will-change-transform">
            {word}&nbsp;
          </span>
        ))}
      </h2>
      {subtitle && (
        <p
          ref={subtitleRef}
          className="text-light-gray text-lg md:text-xl mt-4 max-w-3xl will-change-transform opacity-0"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;