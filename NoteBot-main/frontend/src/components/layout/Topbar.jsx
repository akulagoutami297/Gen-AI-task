import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNoteStore } from '../../store/noteStore'
import { exportPDF, downloadBlob } from '../../utils/api'
import toast from 'react-hot-toast'

const TITLES = {
  summarize: 'AI Study Workspace',
  flashcards: 'Flashcards Memory Deck',
  quiz: 'Knowledge Assessment',
}

export default function Topbar() {
  const store = useNoteStore()
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    if (!store.result) { 
      toast.error('Generate a summary first!')
      return 
    }
    setExporting(true)
    const tid = toast.loading('Generating styled PDF…')
    try {
      const title = store.uploadedFile ? store.uploadedFile.name.replace(/\.[^/.]+$/, "") : 'NoteBot Summary'
      const res = await exportPDF({
        title: title,
        bullets: store.result.bullets,
        keywords: store.result.keywords,
        stats: store.result.stats,
        flashcards: store.flashcards,
        quiz: store.quizQuestions,
      })
      downloadBlob(res.data, `notebot-${title.toLowerCase().replace(/\s+/g, '-')}.pdf`)
      toast.success('PDF saved!', { id: tid })
    } catch (err) {
      const msg = err?.response?.data?.error || 'Export failed — is backend running?'
      toast.error(msg, { id: tid })
    } finally {
      setExporting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        height: 60, display: 'flex', alignItems: 'center',
        padding: '0 24px', gap: 16, flexShrink: 0,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(8,6,17,0.65)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        position: 'relative', zIndex: 10,
      }}
    >
      {/* Title */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 20, fontWeight: 700, color: '#fff',
          letterSpacing: '-0.03em', lineHeight: 1, margin: 0,
        }}>{TITLES[store.activeView] || 'NoteBot'}</h1>
        {store.uploadedFile && store.activeView === 'summarize' && (
          <motion.p
            initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: 11, color: 'rgba(196,181,253,0.5)', marginTop: 2, letterSpacing: '0.02em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            ↳ {store.uploadedFile.name}
          </motion.p>
        )}
      </div>

      {/* Model pill */}
      {store.result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '5px 12px', borderRadius: 99,
            background: 'rgba(5,150,105,0.1)',
            border: '1px solid rgba(5,150,105,0.22)',
            fontSize: 11, fontFamily: "'Fira Code',monospace",
            color: 'rgba(110,231,183,0.85)',
          }}
        >
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 8px rgba(16,185,129,0.8)',
            animation: 'preloaderPulse 2s ease-in-out infinite',
          }}/>
          {store.result.stats?.model || 'AI Model'}
        </motion.div>
      )}

      {/* Export / Reset buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {store.result && (
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
            onClick={handleExport}
            disabled={exporting}
            className={store.result ? 'btn-primary' : 'btn-secondary'}
            style={{
              padding: '7px 16px', borderRadius: 99,
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            {exporting ? (
              <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"/>
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            )}
            {exporting ? 'Exporting…' : 'Export PDF'}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
