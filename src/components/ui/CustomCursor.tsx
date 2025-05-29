import React from 'react';

interface CustomCursorProps {
  cursorRef: React.RefObject<HTMLDivElement>;
  followerRef: React.RefObject<HTMLDivElement>;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ cursorRef, followerRef }) => {
  return (
    <>
      <div
        ref={cursorRef}
        className="fixed z-[999] top-0 left-0 w-2 h-2 rounded-full bg-electric-blue pointer-events-none"
      ></div>
      <div
        ref={followerRef}
        className="fixed z-[999] top-0 left-0 w-8 h-8 rounded-full bg-electric-blue opacity-50 pointer-events-none transition-transform duration-100"
        style={{ willChange: 'transform' }}
      ></div>
    </>
  );
};

export default CustomCursor;