import React from 'react';

interface GlowingGradientBorderProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string; // e.g. "from-purple-glow to-electric-blue"
  hoverEffect?: boolean;
}

const GlowingGradientBorder: React.FC<GlowingGradientBorderProps> = ({
  children,
  className,
  gradient = "from-purple-glow to-electric-blue",
  hoverEffect = true,
}) => {
  return (
    <div
      className={`relative p-[1px] rounded-xl overflow-hidden group ${className}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-xl blur-lg opacity-40 group-hover:opacity-100 transition-opacity duration-500 will-change-filter ${
          hoverEffect ? 'animate-pulse-glow' : ''
        }`}
      ></div>
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-500 will-change-filter`}
      ></div>
      <div
        className="relative bg-dark-gray rounded-xl p-6 h-full w-full flex items-center justify-center
                   group-hover:bg-opacity-80 transition-colors duration-300
                   transform-preserve-3d"
      >
        {children}
      </div>
    </div>
  );
};

export default GlowingGradientBorder;