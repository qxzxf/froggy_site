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
    if (!showGame) {
      setGameScore(0)
    }
  }

  return (
    <main className="min-h-screen w-full relative overflow-hidden">
      <div className="absolute inset-0">
        <Suspense fallback={
          <div className="w-full h-screen flex items-center justify-center">
            <div className="glass-panel">
              <p className="text-xl">Загрузка волшебного пруда...</p>
            </div>
          </div>
        }>
          <Scene />
        </Suspense>
      </div>

      <AnimatePresence>
        {isLoading && (
          <LoadingSpinner onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center pt-20 pointer-events-none">
        <div className="mb-16">
          <AnimatedTitle />
        </div>

        <AnimatePresence>
          {showContent && (
            <motion.div
              className="w-full max-w-md mx-auto px-4 mb-8 pointer-events-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-lg sm:text-xl text-white/80 font-light tracking-wide glass-panel text-center">
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
                className="w-full max-w-md mx-auto px-4 mb-8 pointer-events-auto relative z-50"
              >
                <div className="glass-panel">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      onClick={startRain}
                      disabled={isRaining}
                      className="neon-button w-full sm:w-auto"
                    >
                      Лягушачий дождь
                    </button>

                    <button
                      onClick={handleGameToggle}
                      className="neon-button w-full sm:w-auto"
                    >
                      {showGame ? 'Закрыть игру' : 'Накорми лягушку'}
                    </button>
                  </div>
                </div>
              </motion.div>

              {showGame && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full max-w-md mx-auto px-4 mb-8 pointer-events-auto relative z-50"
                >
                  <div className="glass-panel text-center">
                    <p className="game-score">Поймано мошек: {gameScore}</p>
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full max-w-md mx-auto px-4 mt-auto pointer-events-auto"
              >
                <div className="glass-panel text-center">
                  <p className="secret-hint">
                    Нажмите Ctrl + Q для секрета 🐸
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

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
    </main>
  )
}
