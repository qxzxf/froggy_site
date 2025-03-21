'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { GlassCard } from '@/components/GlassCard'

export default function About() {
  const router = useRouter()

  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      
      {/* Кнопка назад */}
      <motion.button
        onClick={() => router.push('/')}
        className="fixed top-8 left-8 px-6 py-2 rounded-xl text-white/80 backdrop-blur-sm"
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2))',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          boxShadow: '0 4px 20px rgba(59, 130, 246, 0.15)',
        }}
        whileHover={{
          scale: 1.05,
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(37, 99, 235, 0.3))',
        }}
        whileTap={{ scale: 0.95 }}
      >
        ← Назад
      </motion.button>

      {/* Контейнер для карточек */}
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          <GlassCard
            title="Текст"
            icon="🎮"
            variant="emerald"
            delay={0.1}
            className="lg:col-span-2"
          >
            <p className="mb-4">
              Froggy - эт я.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-sm bg-emerald-500/20">текст</span>
              <span className="px-3 py-1 rounded-full text-sm bg-emerald-500/20">текст</span>
              <span className="px-3 py-1 rounded-full text-sm bg-emerald-500/20">текст</span>
            </div>
          </GlassCard>

          <GlassCard
            title="Использованные технологии для этого сайта"
            icon="⚡"
            variant="cyan"
            delay={0.2}
          >
            <ul className="space-y-2 list-disc list-inside marker:text-cyan-400">
              <li>Next.js 13 App Router</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
              <li>React Three Fiber</li>
            </ul>
            <div className="mt-4 pt-3 border-t border-cyan-500/20">
              <a 
                href="https://github.com/qxzxf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>Разработка сайта</span>
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </GlassCard>

          <GlassCard
            title="текст"
            icon="✨"
            variant="lime"
            delay={0.3}
          >
            <ul className="space-y-2 list-disc list-inside marker:text-lime-400">
              <li>текст</li>
              <li>текст</li>
              <li>текст</li>
              <li>текст</li>
              <li>текст</li>
            </ul>
          </GlassCard>

          <GlassCard
            title="текст"
            icon="🎮"
            variant="teal"
            delay={0.4}
          >
            <div className="space-y-3">
              <p className="font-medium text-teal-300">Клавиатура:</p>
              <ul className="space-y-2 list-disc list-inside marker:text-teal-400">
                <li>текст</li>
                <li>текст</li>
                <li>текст</li>
                <li>текст</li>
              </ul>
            </div>
          </GlassCard>

          <GlassCard
            title="текст"
            icon="🌟"
            variant="green"
            delay={0.5}
            className="lg:col-span-2"
          >
            <p className="mb-4">
              текст
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-sm bg-green-500/20">текст</span>
              <span className="px-3 py-1 rounded-full text-sm bg-green-500/20">текст</span>
              <span className="px-3 py-1 rounded-full text-sm bg-green-500/20">текст</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  )
} 