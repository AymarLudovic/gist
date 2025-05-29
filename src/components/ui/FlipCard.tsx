import React, { useRef } from 'react';
import { Flip } from 'gsap/Flip';
import { gsap } from 'gsap';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  isFlipped: boolean;
  className?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ front, back, isFlipped, className }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleFlip = () => {
    const card = cardRef.current;
    if (!card) return;

    // Capture the current state
    const state = Flip.getState(card);

    // Toggle the 'flipped' class which changes the transform property
    if (isFlipped) {
        card.classList.remove('flipped');
    } else {
        card.classList.add('flipped');
    }

    // Animate to the new state
    Flip.from(state, {
      duration: 1,
      ease: "power2.inOut",
      targets: card,
      scale: 1, // Ensure scale is reset or maintained
      // Optional: Add a slight rotation during flip for realism
      rotationY: isFlipped ? 0 : 180,
      onComplete: () => {
        // Any post-flip actions
      }
    });
  };

  // Re-run flip animation if isFlipped state changes
  React.useEffect(() => {
    handleFlip();
  }, [isFlipped]);

  return (
    <div
      ref={cardRef}
      className={`relative w-full h-full perspective-container rounded-xl shadow-neumorphic-dark will-change-transform ${className} ${isFlipped ? 'flipped' : ''}`}
      style={{
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="absolute inset-0 backface-hidden rounded-xl bg-dark-gray p-6 flex items-center justify-center transform-preserve-3d">
        {front}
      </div>
      <div className="absolute inset-0 backface-hidden rounded-xl bg-dark-gray p-6 flex items-center justify-center transform-preserve-3d transform rotate-y-180">
        {back}
      </div>

      <style jsx>{`
        .backface-hidden {
          backface-visibility: hidden;
        }
        .perspective-container {
          perspective: 1000px;
        }
        .flipped .backface-hidden:first-child {
          transform: rotateY(180deg);
        }
        .flipped .backface-hidden:last-child {
          transform: rotateY(0deg);
        }
      `}</style>
    </div>
  );
};

export default FlipCard;