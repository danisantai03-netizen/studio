
"use client";

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useEffect } from 'react';

interface SuccessAnimationProps {
  message?: string;
  iconColor?: string;
  duration?: number;
  onComplete?: () => void;
}

export function SuccessAnimation({
  message = "Success!",
  iconColor = "hsl(var(--primary))",
  duration = 2000,
  onComplete,
}: SuccessAnimationProps) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const iconContainerVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 0.1,
      } 
    },
  };
  
  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="w-24 h-24 rounded-full grid place-items-center"
        style={{ backgroundColor: iconColor }}
        variants={iconContainerVariants}
      >
        <Check className="w-16 h-16 text-primary-foreground" strokeWidth={3} />
      </motion.div>

      <motion.p 
        className="mt-6 text-2xl font-bold text-foreground"
        variants={textVariants}
      >
        {message}
      </motion.p>
    </motion.div>
  );
}
