'use client'

import dynamic from 'next/dynamic'
import { Suspense, useState, useEffect } from 'react'
import { RainEffect, useRainEffect } from '@/components/RainEffect'
import { FeedingGame } from '@/components/FeedingGame'
import { FallingLeaves } from '@/components/FallingLeaves'
import { WaterRipples } from '@/components/WaterRipples'
import { Bubbles } from '@/components/Bubbles'
import { AnimatedTitle } from '@/components/AnimatedTitle'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const Scene = dynamic(() => import('@/components/Scene'), { ssr: false })

export default function Home() {
  const { startRain, isRaining } = useRainEffect()
  const [showGame, setShowGame] = useState(false)
  const [gameScore, setGameScore] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setShowContent(true)
  }

  useEffect(() => {
    if (!showGame) {
      setGameScore(0)
    }
  }, [showGame])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'q') {
        router.push('/about')
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [router])

  const handleGameToggle = () => {
    setShowGame(!showGame)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative overflow-hidden">
      <div className="w-full h-screen relative">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="glass-panel">
              <p className="text-xl">Загрузка волшебного пруда...</p>
            </div>
          </div>
        }>
          <Scene />
        </Suspense>

        <AnimatePresence>
          {isLoading && (
            <LoadingSpinner onLoadingComplete={handleLoadingComplete} />
          )}
        </AnimatePresence>

        <AnimatedTitle />

        <AnimatePresence>
          {showContent && (
            <motion.div
              className="absolute top-[25vh] left-1/2 transform -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-lg sm:text-xl text-white/80 font-light tracking-wide glass-panel">
                Добро пожаловать в волшебный пруд
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showContent && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute top-[35vh] left-1/2 transform -translate-x-1/2 glass-panel flex gap-4 flex-wrap justify-center z-30"
              >
                <button
                  onClick={startRain}
                  disabled={isRaining}
                  className="neon-button"
                >
                  Лягушачий дождь
                </button>

                <button
                  onClick={handleGameToggle}
                  className="neon-button"
                >
                  {showGame ? 'Закрыть игру' : 'Накорми лягушку'}
                </button>
              </motion.div>

              {showGame && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-[45vh] left-1/2 transform -translate-x-1/2 glass-panel"
                >
                  <p className="game-score">Поймано мошек: {gameScore}</p>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass-panel"
              >
                <p className="secret-hint">
                  Нажмите Ctrl + Q для секрета 🐸
                </p>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <Bubbles />
        <WaterRipples />
        <FallingLeaves />
        <RainEffect />
        {showGame && (
          <FeedingGame 
            isActive={showGame} 
            onScoreChange={setGameScore} 
          />
        )}
      </div>
    </main>
  )
}
