import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Preloader from './components/animations/Preloader'
import Sidebar from './components/layout/Sidebar'
import Topbar from './components/layout/Topbar'
import SummarizePage from './pages/SummarizePage'
import FlashcardsPage from './pages/FlashcardsPage'
import QuizPage from './pages/QuizPage'
import { useNoteStore } from './store/noteStore'

export default function App() {
  const { activeView, preloaderDone } = useNoteStore()

  return (
    <>
      <Preloader />
      <AnimatePresence>
        {preloaderDone && (
          <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
            className="flex h-screen w-screen overflow-hidden relative bg-gradient-to-br from-[#0b1020] via-[#12071f] to-[#060816] text-zinc-100 font-sans">

            {/* Cinematic Background System */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#02040A]">
              
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-900/10 via-[#02040A] to-[#02040A]" />
              
              {/* Animated mesh gradient orbs */}
              <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-1/4 -left-1/4 w-[1000px] h-[1000px] rounded-full bg-violet-600/20 blur-[160px]" />
              <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-fuchsia-600/10 blur-[160px]" />
              <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[140px]" />
                
              {/* Subtle noise texture */}
              <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
            </div>

            {/* App Shell */}
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0 relative z-10">
              <Topbar />
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                  {activeView === 'summarize' && <SummarizePage key="summarize"/>}
                  {activeView === 'flashcards' && <FlashcardsPage key="flashcards"/>}
                  {activeView === 'quiz' && <QuizPage key="quiz"/>}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
