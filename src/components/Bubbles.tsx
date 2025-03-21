'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Bubble = {
  id: number
  x: number
  size: number
  delay: number
}

export function Bubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])

  useEffect(() => {
    const createBubble = () => {
      const id = Date.now()
      const x = Math.random() * window.innerWidth
      const size = 20 + Math.random() * 40
      const delay = Math.random() * 2

      setBubbles(prev => [...prev, { id, x, size, delay }])

      setTimeout(() => {
        setBubbles(prev => prev.filter(bubble => bubble.id !== id))
      }, 8000)
    }

    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% шанс создания пузыря
        createBubble()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <AnimatePresence>
        {bubbles.map(bubble => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: bubble.size,
              height: bubble.size
            }}
            initial={{ 
              x: bubble.x,
              y: window.innerHeight + bubble.size,
              scale: 0
            }}
            animate={{
              y: -bubble.size,
              x: bubble.x + Math.sin(Date.now() * 0.001) * 50,
              scale: 1
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 8,
              delay: bubble.delay,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
} 