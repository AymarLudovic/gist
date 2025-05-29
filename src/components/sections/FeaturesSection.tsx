import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionTitle, GlowingGradientBorder, MorphingIcon } from '@/components';

// Dummy icons (replace with actual SVG paths or components)
const iconPath1 = "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"; // Circle
const morphPath1 = "M2 12L12 2L22 12L12 22L2 12Z"; // Diamond

const iconPath2 = "M4 6H20V18H4V6Z"; // Rectangle
const morphPath2 = "M12 2L22 12L12 22L2 12L12 2Z"; // Star-like

const iconPath3 = "M12 2L2 12H22L12 2Z"; // Triangle
const morphPath3 = "M4 4H20V20H4V4Z"; // Square

const features = [
  {
    title: "Unrivaled Security",
    description: "Leverage blockchain's immutable ledger and advanced encryption for ultimate asset protection.",
    icon: iconPath1,
    morphIcon: morphPath1,
    color: "#50E3C2",
  },
  {
    title: "Smart Contract Automation",
    description: "Automate complex financial operations with robust and audited smart contracts for efficiency.",
    icon: iconPath2,
    morphIcon: morphPath2,
    color: "#4A90E2",
  },
  {
    title: "Scalable Infrastructure",
    description: "Our platform grows with your needs, ensuring high performance even under peak demand.",
    icon: iconPath3,
    morphIcon: morphPath3,
    color: "#A64AE2",
  },
  {
    title: "Cross-Chain Compatibility",
    description: "Seamlessly interact with multiple blockchain networks, expanding your investment opportunities.",
    icon: iconPath1,
    morphIcon: morphPath1,
    color: "#F8E71C",
  },
  {
    title: "Intuitive Analytics",
    description: "Gain deep insights into market trends and portfolio performance with clear, actionable data.",
    icon: iconPath2,
    morphIcon: morphPath2,
    color: "#neon-pink",
  },
  {
    title: "Community Driven",
    description: "Join a thriving ecosystem where your voice shapes the future of decentralized finance.",
    icon: iconPath3,
    morphIcon: morphPath3,
    color: "#electric-blue",
  },
];

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const featureCardsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {
      // Horizontal scroll animation
      const horizontalElements = horizontalSectionRef.current;
      if (horizontalElements) {
        gsap.to(horizontalElements, {
          x: () => -(horizontalElements.scrollWidth - window.innerWidth + (window.innerWidth * 0.1)), // Scroll until end, plus some padding
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + (horizontalElements.scrollWidth - window.innerWidth + (window.innerWidth * 0.1)), // Pin duration
            pin: true,
            scrub: 1, // Smooth scrub
            // markers: true,
            invalidateOnRefresh: true,
            // Adjust for mobile if horizontal scroll is not desired there
            // matchMedia: {
            //   "(max-width: 767px)": {
            //     scrollTrigger: {
            //       pin: false,
            //       scrub: false,
            //     }
            //   }
            // }
          },
        });
      }

      // Feature cards reveal animations with a slight delay
      featureCardsRefs.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 100, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                // markers: true,
              },
              delay: (i % 3) * 0.1, // Stagger by row for grid effect
            }
          );

          // Add subtle hover effect for cards
          gsap.to(card, {
            rotationY: 5,
            scale: 1.02,
            duration: 0.3,
            paused: true,
            ease: "power2.out",
            onEnter: () => gsap.to(card, { rotationY: 5, scale: 1.02, duration: 0.3 }),
            onLeave: () => gsap.to(card, { rotationY: 0, scale: 1, duration: 0.3 }),
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="snap-section w-full bg-dark-gray py-20 overflow-hidden">
      <SectionTitle
        title="Unleash Your Potential"
        subtitle="Discover the powerful features that make CryptoForge the ultimate platform for Web3 enthusiasts and investors."
        effect="reveal"
      />

      <div className="p-8 lg:p-12">
        <div ref={horizontalSectionRef} className="flex flex-nowrap w-max gap-8 px-4 will-change-transform">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => (featureCardsRefs.current[index] = el)}
              className="flex-shrink-0 w-80 md:w-96 p-8 bg-deep-black rounded-3xl shadow-lg hover:shadow-neumorphic-light transition-all duration-300 transform-preserve-3d cursor-hover group"
              style={{
                minWidth: '320px' // Ensure fixed width for horizontal scroll
              }}
            >
              <GlowingGradientBorder className="w-full h-full p-0">
                <div className="flex flex-col items-center text-center p-8">
                  <div className="mb-6">
                    <MorphingIcon
                      initialPath={feature.icon}
                      morphPath={feature.morphIcon}
                      size={60}
                      color={feature.color}
                      hoverTrigger={true}
                    />
                  </div>
                  <h3 className="text-white text-2xl font-display font-semibold mb-4 will-change-transform group-hover:text-electric-blue transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-light-gray font-sans will-change-transform group-hover:scale-[1.01] transition-transform duration-300">
                    {feature.description}
                  </p>
                </div>
              </GlowingGradientBorder>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;