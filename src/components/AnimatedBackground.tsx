'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const HEXAGONS = Array.from({ length: 12 }).map((_, i) => ({
  size: 120 + Math.floor(i / 3) * 80,
  delay: i * 0.2,
  duration: 20 + i * 2,
  opacity: 0.03 + (i % 3) * 0.01
}))

const LIGHT_BEAMS = Array.from({ length: 8 }).map((_, i) => ({
  rotation: (360 / 8) * i,
  delay: i * 0.5,
  baseOpacity: 0.03 + (i % 3) * 0.01
}))

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gray-950">
      {/* Основной градиент */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, 
              rgba(29, 78, 216, 0.15) 0%,
              rgba(30, 64, 175, 0.12) 25%,
              rgba(17, 24, 39, 0.4) 50%,
              rgba(17, 24, 39, 0.9) 100%
            ),
            linear-gradient(45deg,
              rgba(14, 165, 233, 0.05) 0%,
              rgba(79, 70, 229, 0.05) 50%,
              rgba(236, 72, 153, 0.05) 100%
            )
          `,
        }}
      />

      {/* Анимированные шестиугольники */}
      {HEXAGONS.map((hexagon, i) => (
        <motion.div
          key={`hexagon-${i}`}
          className="absolute left-1/2 top-1/2"
          style={{
            width: hexagon.size,
            height: hexagon.size,
            x: '-50%',
            y: '-50%',
            border: '1px solid rgba(59, 130, 246, 0.1)',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            opacity: [hexagon.opacity, hexagon.opacity * 1.5, hexagon.opacity],
          }}
          transition={{
            duration: hexagon.duration,
            repeat: Infinity,
            ease: "linear",
            delay: hexagon.delay,
          }}
        />
      ))}

      {/* Световые лучи */}
      {LIGHT_BEAMS.map((beam, i) => (
        <motion.div
          key={`beam-${i}`}
          className="absolute left-1/2 top-1/2 origin-bottom"
          style={{
            width: '2px',
            height: '40%',
            x: '-50%',
            rotate: beam.rotation,
            background: 'linear-gradient(to top, rgba(59, 130, 246, 0.1), transparent)',
          }}
          animate={{
            opacity: [beam.baseOpacity, beam.baseOpacity * 2, beam.baseOpacity],
            height: ['40%', '45%', '40%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: beam.delay,
          }}
        />
      ))}

      {/* Плавающие частицы */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${(i * 2.5) % 100}%`,
            top: `${(i * 3.7) % 100}%`,
            background: `rgba(${
              147 + (i % 3) * 30
            }, ${
              197 + (i % 2) * 30
            }, ${
              253
            }, 0.5)`,
            boxShadow: `0 0 4px rgba(147, 197, 253, 0.3)`,
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, (i % 2 === 0 ? 15 : -15), 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}

      {/* Сетка */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          mask: 'radial-gradient(circle at center, black 30%, transparent 70%)',
        }}
      />

      {/* Пульсирующие круги */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            x: '-50%',
            y: '-50%',
            border: '1px solid rgba(59, 130, 246, 0.1)',
            width: 300 + i * 100,
            height: 300 + i * 100,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.05, 0.1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1,
          }}
        />
      ))}

      {/* Блюр оверлей */}
      <div 
        className="absolute inset-0"
        style={{
          backdropFilter: 'blur(90px)',
          opacity: 0.3,
        }}
      />
    </div>
  )
} 