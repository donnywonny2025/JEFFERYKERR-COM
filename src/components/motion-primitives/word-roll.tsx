'use client';
import {
  motion,
  VariantLabels,
  Target,
  TargetAndTransition,
  Transition,
} from 'motion/react';

export type WordRollProps = {
  children: string;
  duration?: number;
  getEnterDelay?: (index: number) => number;
  className?: string;
  transition?: Transition;
  variants?: {
    enter: {
      initial: Target | VariantLabels | boolean;
      animate: TargetAndTransition | VariantLabels;
    };
  };
  onAnimationComplete?: () => void;
};

export function WordRoll({
  children,
  duration = 0.6,
  getEnterDelay = (i) => i * 0.05,
  className,
  transition = { ease: 'easeOut' },
  variants,
  onAnimationComplete,
}: WordRollProps) {
  const defaultVariants = {
    enter: {
      initial: { rotateX: 90, opacity: 0 },
      animate: { rotateX: 0, opacity: 1 },
    },
  } as const;

  const words = children.split(' ');

  return (
    <span className={className} style={{ display: 'inline' }}>
      {words.map((word, i) => {
        const isLastWord = i === words.length - 1;
        return (
          <span key={i} className="inline-block" style={{ perspective: '1000px' }}>
            <motion.span
              className="inline-block"
              style={{ 
                transformStyle: 'preserve-3d',
                transformOrigin: 'center bottom'
              }}
              initial={
                variants?.enter?.initial ?? defaultVariants.enter.initial
              }
              animate={
                variants?.enter?.animate ?? defaultVariants.enter.animate
              }
              transition={{
                ...transition,
                duration,
                delay: getEnterDelay(i),
              }}
              onAnimationComplete={
                isLastWord ? onAnimationComplete : undefined
              }
            >
              {word}
            </motion.span>
            {!isLastWord && <span> </span>}
          </span>
        );
      })}
      <span className="sr-only">{children}</span>
    </span>
  );
}
