'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Leaf = {
  id: number
  x: number
  rotation: number
  delay: number
  scale: number
}

const LEAF_EMOJIS = ['🍃', '🌿', '☘️']

export function FallingLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([])

  useEffect(() => {
    const createLeaf = () => {
      const id = Date.now()
      const x = Math.random() * window.innerWidth
      const rotation = Math.random() * 360
      const delay = Math.random() * 2
      const scale = 0.5 + Math.random() * 1

      setLeaves(prev => [...prev, { id, x, rotation, delay, scale }])

      setTimeout(() => {
        setLeaves(prev => prev.filter(leaf => leaf.id !== id))
      }, 10000)
    }

    const interval = setInterval(createLeaf, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      <AnimatePresence>
        {leaves.map(leaf => (
          <motion.div
            key={leaf.id}
            className="absolute text-2xl"
            initial={{ 
              x: leaf.x,
              y: -50,
              rotate: leaf.rotation,
              scale: leaf.scale
            }}
            animate={{
              y: window.innerHeight + 50,
              x: leaf.x + Math.sin(Date.now() * 0.001) * 100,
              rotate: leaf.rotation + 360
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 10,
              delay: leaf.delay,
              ease: "linear"
            }}
            style={{
              transformOrigin: 'center'
            }}
          >
            {LEAF_EMOJIS[Math.floor(Math.random() * LEAF_EMOJIS.length)]}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
} 