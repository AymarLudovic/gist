import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    gsap.set(button, { willChange: 'transform, background-color, border-color, box-shadow' });

    // Micro-animation on hover
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        x: 2,
        y: -2,
        boxShadow: '0 8px 16px rgba(74, 144, 226, 0.4)', // Stronger glow
        duration: 0.3,
        ease: "power2.out",
      });
      // Ripple effect on hover
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      button.appendChild(ripple);
      const diameter = Math.max(button.offsetWidth, button.offsetHeight);
      const radius = diameter / 2;
      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${(event as MouseEvent).clientX - button.getBoundingClientRect().left - radius}px`;
      ripple.style.top = `${(event as MouseEvent).clientY - button.getBoundingClientRect().top - radius}px`;
      gsap.to(ripple, {
        scale: 1,
        opacity: 0,
        duration: 0.6,
        ease: "power1.out",
        onComplete: () => ripple.remove()
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        x: 0,
        y: 0,
        boxShadow: '0 4px 8px rgba(74, 144, 226, 0.2)', // Default glow
        duration: 0.3,
        ease: "power2.out",
      });
    });

    // Simple click animation (pulse)
    button.addEventListener('click', () => {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.15,
        ease: "power1.in",
        onComplete: () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.25,
            ease: "power1.out"
          });
        }
      });
    });

    return () => {
      // Clean up event listeners if component unmounts
      const clone = button.cloneNode(true) as HTMLButtonElement;
      button.parentNode?.replaceChild(clone, button);
      gsap.killTweensOf(button);
    };
  }, []);

  const baseStyles = 'relative overflow-hidden font-alt-sans font-semibold rounded-lg transition-all duration-300 ease-in-out transform active:scale-95 cursor-hover will-change-transform';
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  const variantStyles = {
    primary: 'bg-electric-blue text-white shadow-glow-sm hover:bg-opacity-90',
    secondary: 'bg-purple-glow text-white shadow-glow-sm hover:bg-opacity-90',
    outline: 'bg-transparent border border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white',
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
      <style jsx>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple-animation 600ms linear;
          background-color: rgba(255, 255, 255, 0.7);
          pointer-events: none;
          z-index: 10;
        }

        @keyframes ripple-animation {
          from {
            opacity: 0.7;
            transform: scale(0);
          }
          to {
            opacity: 0;
            transform: scale(1.5);
          }
        }
      `}</style>
    </button>
  );
};

export default Button;