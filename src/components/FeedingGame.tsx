'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Fly = {
  id: number
  x: number
  y: number
  scale: number
  rotation: number
}

interface FeedingGameProps {
  isActive: boolean
  onScoreChange?: (score: number) => void
}

export function FeedingGame({ isActive, onScoreChange }: FeedingGameProps) {
  const [flies, setFlies] = useState<Fly[]>([])
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [lastCatchTime, setLastCatchTime] = useState(0)

  // Сброс состояния при деактивации игры
  useEffect(() => {
    if (!isActive) {
      setFlies([])
      setScore(0)
      setCombo(0)
    }
  }, [isActive])

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      const newFly = {
        id: Date.now(),
        x: Math.random() * (window.innerWidth - 50),
        y: Math.random() * (window.innerHeight - 50),
        scale: 0.8 + Math.random() * 0.4,
        rotation: Math.random() * 360
      }
      setFlies(prev => [...prev, newFly])
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive])

  const catchFly = (id: number) => {
    const now = Date.now()
    if (now - lastCatchTime < 1000) {
      setCombo(prev => prev + 1)
    } else {
      setCombo(1)
    }
    setLastCatchTime(now)

    setFlies(prev => prev.filter(fly => fly.id !== id))
    const newScore = score + (1 + Math.floor(combo / 3))
    setScore(newScore)
    onScoreChange?.(newScore)
  }

  return (
    <div className="absolute inset-0 z-20">
      {combo > 1 && (
        <div className="absolute top-4 right-4 glass-panel">
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-sm text-green-400"
          >
            Комбо: x{combo}!
          </motion.p>
        </div>
      )}

      <AnimatePresence>
        {flies.map(fly => (
          <motion.div
            key={fly.id}
            className="absolute cursor-pointer select-none"
            initial={{ 
              x: fly.x,
              y: fly.y,
              scale: 0,
              rotate: fly.rotation
            }}
            animate={{ 
              scale: fly.scale,
              x: fly.x + Math.sin(Date.now() * 0.001) * 30,
              y: fly.y + Math.cos(Date.now() * 0.001) * 30,
              rotate: fly.rotation + Math.sin(Date.now() * 0.002) * 30
            }}
            exit={{ 
              scale: 0,
              opacity: 0,
              rotate: fly.rotation + 360
            }}
            onClick={() => catchFly(fly.id)}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
            whileHover={{
              scale: fly.scale * 1.2,
              transition: { duration: 0.2 }
            }}
            whileTap={{
              scale: fly.scale * 0.8,
              transition: { duration: 0.1 }
            }}
          >
            <span className="text-2xl filter drop-shadow-lg">🪰</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
} 