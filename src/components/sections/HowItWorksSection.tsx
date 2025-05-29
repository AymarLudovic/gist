import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionTitle } from '@/components';
import { MorphingIcon } from '@/components';

// Dummy SVG paths for morphing effect between steps
const iconStep1 = "M12 2L2 12H22L12 2Z"; // Triangle (Setup Account)
const iconStep2 = "M4 6H20V18H4V6Z"; // Rectangle (Connect Wallet)
const iconStep3 = "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"; // Circle (Start Trading)

const steps = [
  {
    id: 1,
    title: "Create Your Secure Account",
    description: "Start your journey by signing up with our end-to-end encrypted registration process. Fast and secure.",
    icon: iconStep1,
  },
  {
    id: 2,
    title: "Connect Your Wallet",
    description: "Integrate your preferred crypto wallet seamlessly to manage your assets directly on our platform.",
    icon: iconStep2,
  },
  {
    id: 3,
    title: "Explore & Invest",
    description: "Dive into a world of decentralized opportunities. Discover, analyze, and invest in promising Web3 projects.",
    icon: iconStep3,
  },
  {
    id: 4,
    title: "Monitor & Grow",
    description: "Track your portfolio in real-time with advanced analytics and grow your assets with smart strategies.",
    icon: iconStep1, // Cycle back to first icon for loop
  },
];

const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {
      // Timeline for steps revelation and line drawing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          // markers: true,
        },
      });

      // Animate vertical line
      if (lineRef.current) {
        tl.fromTo(lineRef.current,
          { scaleY: 0, transformOrigin: "top" },
          { scaleY: 1, duration: steps.length * 1.5, ease: "none" }
        );
      }

      // Animate each step sequentially
      stepRefs.current.forEach((step, i) => {
        if (step) {
          const icon = step.querySelector('.morph-icon');
          const content = step.querySelector('.step-content');

          tl.fromTo(step,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
            i === 0 ? "<" : ">-0.8" // Stagger the start of each step after the previous one
          );

          if (icon) {
            gsap.fromTo(icon,
              { rotation: -90, scale: 0.5, opacity: 0 },
              { rotation: 0, scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
              "<0.2" // Overlap with step reveal
            );
          }
          if (content) {
            gsap.fromTo(content,
              { opacity: 0, x: i % 2 === 0 ? -50 : 50 }, // Alternate direction
              { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
              "<0.2"
            );
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="snap-section relative bg-deep-black py-20 overflow-hidden">
      <SectionTitle
        title="Your Journey to Web3"
        subtitle="Embark on your decentralized finance adventure in just a few simple steps. We make it easy."
        effect="reveal"
      />

      <div className="relative max-w-5xl mx-auto flex flex-col items-center px-4">
        {/* Vertical Timeline Line */}
        <div
          ref={lineRef}
          className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-electric-blue to-purple-glow rounded-full z-0 origin-top"
          style={{ height: `calc(${steps.length * 200}px + 100px)` }} // Adjust height based on number of steps
        ></div>

        {steps.map((step, i) => (
          <div
            key={step.id}
            ref={el => (stepRefs.current[i] = el)}
            className={`relative flex items-center w-full my-12 will-change-transform ${
              i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            {/* Step Content */}
            <div
              className={`w-1/2 p-6 rounded-2xl bg-dark-gray shadow-lg transform-preserve-3d will-change-transform step-content ${
                i % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'
              }`}
            >
              <h3 className="text-white text-3xl font-display font-semibold mb-4">{`0${step.id}. ${step.title}`}</h3>
              <p className="text-light-gray text-lg font-sans">{step.description}</p>
            </div>

            {/* Icon & Connector */}
            <div className={`relative z-10 w-1/2 flex items-center ${i % 2 === 0 ? 'justify-end pr-8' : 'justify-start pl-8'}`}>
              <div className="bg-electric-blue rounded-full w-16 h-16 flex items-center justify-center shadow-lg transform-preserve-3d group cursor-hover">
                <MorphingIcon
                  className="morph-icon"
                  initialPath={step.icon}
                  morphPath={steps[(i + 1) % steps.length].icon} // Morph to the next step's icon
                  size={32}
                  color="white"
                  hoverTrigger={false} // Triggered by scroll timeline
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;