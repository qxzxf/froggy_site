'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Frog = {
  id: number
  x: number
  delay: number
  scale: number
  rotation: number
  flipX: boolean
}

export function RainEffect() {
  const [frogs, setFrogs] = useState<Frog[]>([])

  useEffect(() => {
    const handleCreateFrog = () => {
      const id = Date.now()
      const x = Math.random() * (window.innerWidth - 40)
      const delay = Math.random() * 0.5
      const scale = 0.8 + Math.random() * 0.4
      const rotation = Math.random() * 30 - 15 // Случайный наклон от -15 до 15 градусов
      const flipX = Math.random() > 0.5 // Случайное отражение по горизонтали
      
      setFrogs(prev => [...prev, { id, x, delay, scale, rotation, flipX }])
      
      // Удаляем лягушку после анимации
      setTimeout(() => {
        setFrogs(prev => prev.filter(frog => frog.id !== id))
      }, 3000)
    }

    window.addEventListener('createFrog', handleCreateFrog)
    return () => window.removeEventListener('createFrog', handleCreateFrog)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {frogs.map(({ id, x, delay, scale, rotation, flipX }) => (
          <motion.div
            key={id}
            className="absolute"
            initial={{ 
              y: -100, 
              x,
              rotate: rotation,
              scale: scale,
              scaleX: flipX ? -1 : 1
            }}
            animate={{ 
              y: window.innerHeight + 100,
              rotate: rotation + (flipX ? -360 : 360)
            }}
            exit={{ 
              opacity: 0,
              scale: 0
            }}
            transition={{
              duration: 3,
              delay,
              ease: [0.645, 0.045, 0.355, 1],
              rotate: {
                duration: 3,
                ease: "linear"
              }
            }}
          >
            <span className="text-4xl filter drop-shadow-lg" style={{ display: 'inline-block' }}>🐸</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export function useRainEffect() {
  const [isRaining, setIsRaining] = useState(false)

  const startRain = () => {
    if (isRaining) return
    
    setIsRaining(true)
    
    // Создаем много лягушек с разной частотой
    let count = 0
    const maxFrogs = 30 // Максимальное количество лягушек
    
    const interval = setInterval(() => {
      if (count >= maxFrogs) {
        clearInterval(interval)
        setTimeout(() => setIsRaining(false), 1000)
        return
      }
      
      const event = new CustomEvent('createFrog')
      window.dispatchEvent(event)
      count++
    }, 100)

    // Очистка на всякий случай
    setTimeout(() => {
      clearInterval(interval)
      setIsRaining(false)
    }, 5000)
  }

  return { startRain, isRaining }
} 