'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ReactNode, useRef, useState } from 'react'

interface GlassCardProps {
  children: ReactNode
  icon?: string
  title: string
  delay?: number
  className?: string
  variant?: 'green' | 'emerald' | 'lime' | 'teal' | 'cyan'
}

const VARIANTS = {
  green: {
    primary: '#10B981',
    secondary: '#059669',
    accent: '#065F46',
    glow: 'rgba(16, 185, 129, 0.15)'
  },
  emerald: {
    primary: '#2DD4BF',
    secondary: '#0D9488',
    accent: '#0F766E',
    glow: 'rgba(45, 212, 191, 0.15)'
  },
  lime: {
    primary: '#84CC16',
    secondary: '#65A30D',
    accent: '#4D7C0F',
    glow: 'rgba(132, 204, 22, 0.15)'
  },
  teal: {
    primary: '#14B8A6',
    secondary: '#0D9488',
    accent: '#0F766E',
    glow: 'rgba(20, 184, 166, 0.15)'
  },
  cyan: {
    primary: '#06B6D4',
    secondary: '#0891B2',
    accent: '#0E7490',
    glow: 'rgba(6, 182, 212, 0.15)'
  }
}

export function GlassCard({ 
  children, 
  icon, 
  title, 
  delay = 0, 
  className = '',
  variant = 'green'
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const colors = VARIANTS[variant]

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"])
  const translateZ = useTransform(
    mouseY,
    [-0.5, 0.5],
    ["40px", "40px"]
  )
  const scale = useSpring(1)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
    scale.set(1.05)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative group ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        stiffness: 200,
        damping: 25
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        x.set(0)
        y.set(0)
        scale.set(1)
      }}
      style={{
        rotateX,
        rotateY,
        translateZ,
        scale,
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
        perspective: "1000px",
        willChange: "transform"
      }}
    >
      {/* Фоновая подсветка */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-20 blur-xl transition-all duration-500"
        animate={{
          background: [
            `linear-gradient(45deg, ${colors.primary}66, ${colors.secondary}66)`,
            `linear-gradient(225deg, ${colors.secondary}66, ${colors.primary}66)`,
            `linear-gradient(45deg, ${colors.primary}66, ${colors.secondary}66)`
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          opacity: isHovered ? 0.4 : 0.2,
        }}
      />

      {/* Основная карточка */}
      <motion.div
        className="relative overflow-hidden p-6 rounded-xl backdrop-blur-md border border-white/5"
        style={{
          background: `linear-gradient(135deg, 
            rgba(255, 255, 255, 0.08),
            rgba(255, 255, 255, 0.03)
          )`,
          transformStyle: "preserve-3d",
          boxShadow: `0 4px 30px ${colors.glow}`,
        }}
      >
        {/* Заголовок */}
        <motion.div 
          className="flex items-center gap-3 mb-6 relative"
          style={{ transform: "translateZ(50px)" }}
        >
          {icon && (
            <motion.div
              className="relative"
              animate={{
                rotate: isHovered ? [0, -10, 10, 0] : 0,
                scale: isHovered ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-4xl relative z-10">{icon}</span>
              <motion.div
                className="absolute -inset-2 rounded-full blur-md"
                style={{
                  background: colors.primary,
                  opacity: 0.2,
                }}
                animate={{
                  scale: isHovered ? [1, 1.2, 1] : 1,
                  opacity: isHovered ? [0.2, 0.3, 0.2] : 0.2,
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
          )}
          <div>
            <h3 
              className="text-2xl font-bold tracking-tight"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: `0 2px 10px ${colors.glow}`,
              }}
            >
              {title}
            </h3>
            <motion.div
              className="h-0.5 mt-1 origin-left"
              style={{
                background: `linear-gradient(to right, ${colors.primary}, transparent)`,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: delay + 0.3 }}
            />
          </div>
        </motion.div>

        {/* Контент */}
        <motion.div 
          className="text-gray-300/90 leading-relaxed relative"
          style={{ transform: "translateZ(30px)" }}
        >
          {children}
        </motion.div>

        {/* Декоративные элементы */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Блики */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 rounded-full"
              style={{
                background: `radial-gradient(circle, ${colors.primary}11 0%, transparent 70%)`,
                left: `${(i * 30 + 10)}%`,
                top: `${(i * 20 + 20)}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 30, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}

          {/* Частицы */}
          {isHovered && [...Array(8)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: colors.primary,
                left: `${10 + i * 12}%`,
                top: '50%',
              }}
              animate={{
                y: [0, -60, 0],
                x: [0, i % 2 === 0 ? 20 : -20, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
} 