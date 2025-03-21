'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Ripple = {
  id: number
  x: number
  y: number
}

export function WaterRipples() {
  const [ripples, setRipples] = useState<Ripple[]>([])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      }
      
      setRipples(prev => [...prev, newRipple])
      
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
      }, 1000)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="absolute w-4 h-4 bg-white/20 rounded-full"
            initial={{ 
              x: ripple.x - 8,
              y: ripple.y - 8,
              scale: 0,
              opacity: 0.8
            }}
            animate={{ 
              scale: 4,
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
} 