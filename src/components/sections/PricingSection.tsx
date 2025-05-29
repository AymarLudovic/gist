import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionTitle, Button, GlowingGradientBorder } from '@/components';

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Basic",
    price: "$29/month",
    features: [
      "Access to basic analytics",
      "Limited smart contract templates",
      "Community forum access",
      "Standard customer support",
    ],
  },
  {
    name: "Pro",
    price: "$79/month",
    features: [
      "Advanced analytics dashboard",
      "Customizable smart contract templates",
      "Priority customer support",
      "Exclusive market insights",
      "Cross-chain asset management",
    ],
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Tailored solutions for institutions",
      "Dedicated account manager",
      "On-demand feature development",
      "24/7 Premium support",
      "Advanced API access & integrations",
    ],
  },
];

const PricingSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const planRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMonthly, setIsMonthly] = useState(true);

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {
      // Staggered reveal for pricing plans
      planRefs.current.forEach((plan, i) => {
        if (plan) {
          gsap.fromTo(plan,
            { opacity: 0, y: 100, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: plan,
                start: "top 80%",
                // markers: true,
              },
              delay: i * 0.2, // Staggered entry
            }
          );

          // Add pseudo-3D hover effect to plans
          gsap.set(plan, { transformOrigin: "center center", willChange: "transform, box-shadow" });

          plan.addEventListener('mouseenter', () => {
            gsap.to(plan, {
              rotationY: 5,
              rotationX: -5,
              scale: 1.03,
              duration: 0.4,
              ease: "power2.out",
              boxShadow: '0 15px 30px rgba(0,0,0,0.4)', // Deeper shadow on hover
            });
          });

          plan.addEventListener('mouseleave', () => {
            gsap.to(plan, {
              rotationY: 0,
              rotationX: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
              boxShadow: '0 5px 15px rgba(0,0,0,0.2)', // Restore default shadow
            });
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="snap-section bg-deep-black py-20 px-4 overflow-hidden">
      <SectionTitle
        title="Simple, Transparent Pricing"
        subtitle="Choose the plan that best fits your needs, from individual traders to large institutions."
        effect="reveal"
      />

      {/* Pricing Toggle */}
      <div className="flex justify-center mb-16 font-alt-sans">
        <div className="relative p-1 bg-dark-gray rounded-full flex items-center shadow-inner-neumorphic">
          <button
            onClick={() => setIsMonthly(true)}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              isMonthly ? 'bg-electric-blue text-white shadow-md' : 'text-light-gray hover:text-white'
            } cursor-hover`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsMonthly(false)}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              !isMonthly ? 'bg-electric-blue text-white shadow-md' : 'text-light-gray hover:text-white'
            } cursor-hover`}
          >
            Annually (-20%)
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {pricingPlans.map((plan, i) => (
          <div
            key={plan.name}
            ref={el => (planRefs.current[i] = el)}
            className={`relative rounded-3xl p-1 shadow-neumorphic-dark will-change-transform ${
              plan.isPopular ? 'bg-gradient-to-br from-electric-blue to-purple-glow transform scale-[1.02] shadow-glow-lg' : 'bg-dark-gray'
            }`}
          >
            <div className={`bg-deep-black rounded-[calc(1.5rem-1px)] p-8 h-full flex flex-col justify-between ${plan.isPopular ? 'p-10' : 'p-8'}`}>
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-vibrant-green text-deep-black text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                  Popular
                </div>
              )}
              <div>
                <h3 className="text-white text-3xl font-display font-bold mb-4">{plan.name}</h3>
                <p className="text-light-gray text-lg mb-6">
                  {plan.name === "Enterprise" ? (
                    <span className="text-4xl text-gradient-purple-blue font-bold">Contact Us</span>
                  ) : (
                    <>
                      <span className="text-5xl font-display font-bold text-electric-blue">
                        {isMonthly ? plan.price.split('/')[0] : `$${(parseInt(plan.price.split('/')[0].slice(1)) * 0.8).toFixed(0)}`}
                      </span>
                      <span className="text-xl text-light-gray">/{isMonthly ? 'month' : 'year'}</span>
                    </>
                  )}
                </p>
                <ul className="space-y-3 text-light-gray text-lg font-alt-sans mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-vibrant-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                variant={plan.isPopular ? "secondary" : "primary"}
                size="lg"
                className="w-full mt-auto"
                onClick={() => console.log(`Selected ${plan.name} plan`)}
              >
                {plan.name === "Enterprise" ? "Contact Sales" : "Choose Plan"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;