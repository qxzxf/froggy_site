'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  onLoadingComplete: () => void
}

export function LoadingSpinner({ onLoadingComplete }: LoadingSpinnerProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        setTimeout(onLoadingComplete, 5000)
      }}
    >
      <div className="relative">
        <motion.div
          className="w-24 h-24 border-4 border-green-500 rounded-full border-t-transparent"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 1,
            repeat: 5,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute inset-0 w-32 h-32 -m-4 border-4 border-green-300/30 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  )
} 