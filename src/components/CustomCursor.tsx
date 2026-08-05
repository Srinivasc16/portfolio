import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { CursorVariant } from '../types';

interface CustomCursorProps {
  variant: CursorVariant;
  cursorText?: string;
  enabled: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ variant, cursorText = '', enabled }) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth liquid spring physics for trailing ring
  const springConfig = { stiffness: 400, damping: 28 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Tight spring physics for inner precision dot
  const dotSpringConfig = { stiffness: 900, damping: 40 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    const checkTouch = () => {
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        setIsTouchDevice(true);
      }
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!enabled || isTouchDevice) return null;

  // Size and styling based on active variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'project':
        return {
          width: 90,
          height: 90,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          color: '#08080a',
          borderColor: 'transparent',
          scale: 1,
        };
      case 'hover':
        return {
          width: 50,
          height: 50,
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          borderColor: 'rgba(255, 255, 255, 0.4)',
          scale: 1.1,
        };
      case 'magnetic':
        return {
          width: 60,
          height: 60,
          backgroundColor: 'rgba(147, 204, 255, 0.15)',
          borderColor: '#93ccff',
          scale: 1.2,
        };
      case 'text':
        return {
          width: 32,
          height: 32,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderColor: 'rgba(255, 255, 255, 0.5)',
          scale: 0.9,
        };
      case 'hidden':
        return {
          width: 0,
          height: 0,
          opacity: 0,
          scale: 0,
        };
      default:
        return {
          width: 24,
          height: 24,
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 255, 255, 0.35)',
          scale: 1,
        };
    }
  };

  const currentStyles = getVariantStyles();

  return (
    <>
      {/* Outer liquid trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border flex items-center justify-center backdrop-blur-[2px] transition-colors duration-200"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: currentStyles.width,
          height: currentStyles.height,
          backgroundColor: currentStyles.backgroundColor,
          borderColor: currentStyles.borderColor || 'rgba(255, 255, 255, 0.3)',
        }}
        animate={{
          scale: currentStyles.scale,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {variant === 'project' && (
          <span className="text-[11px] font-bold tracking-wider uppercase select-none text-center leading-tight">
            {cursorText || 'VIEW'}
          </span>
        )}
      </motion.div>

      {/* Inner sharp precision center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-2 h-2 bg-white rounded-full mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: variant === 'project' ? 0 : 0.9,
        }}
      />
    </>
  );
};
