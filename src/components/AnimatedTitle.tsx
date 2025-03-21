'use client'

import { motion } from 'framer-motion'

interface AnimatedTitleProps {
  onAnimationComplete?: () => void
}

export function AnimatedTitle({ onAnimationComplete }: AnimatedTitleProps) {
  const letters = "FrOgGy".split("")
  
  const containerAnimation = {
    initial: { 
      opacity: 0,
      y: -20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  }
  
  const letterAnimation = {
    initial: { 
      y: -20,
      opacity: 0,
      rotateX: -90
    },
    animate: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  }

  return (
    <motion.div
      className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30"
      initial="initial"
      animate="animate"
      variants={containerAnimation}
      onAnimationComplete={() => onAnimationComplete?.()}
    >
      <div className="flex justify-center items-center">
        {letters.map((letter, index) => (
          <motion.div
            key={index}
            variants={letterAnimation}
            className="relative transform-gpu"
            whileHover={{
              scale: 1.2,
              rotate: [0, -10, 10, 0],
              transition: { duration: 0.3 }
            }}
          >
            <span 
              className="font-bold text-5xl sm:text-6xl md:text-7xl"
              style={{
                background: `linear-gradient(135deg, 
                  #4ade80 0%,
                  #22c55e 25%,
                  #15803d 50%,
                  #22c55e 75%,
                  #4ade80 100%)`,
                backgroundSize: "200% 200%",
                animation: "gradient 3s ease infinite",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 20px rgba(74, 222, 128, 0.7))",
                fontFamily: "'Righteous', cursive",
                textShadow: `
                  0 0 20px rgba(74, 222, 128, 0.3),
                  0 0 40px rgba(74, 222, 128, 0.2),
                  0 0 60px rgba(74, 222, 128, 0.1)
                `
              }}
            >
              {letter}
            </span>
            <motion.span
              className="absolute left-0 -bottom-4 transform scale-y-[-0.2] scale-x-[1] opacity-20 blur-[2px]"
              style={{
                background: "linear-gradient(to bottom, #4ade80, transparent)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Righteous', cursive"
              }}
            >
              {letter}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
} 