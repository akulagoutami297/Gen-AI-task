import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNoteStore } from '../../store/noteStore'
import api from '../../utils/api'

const NAV = [
  {
    id: 'summarize', label: 'Workspace', sub: 'Summarize & analyze',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    id: 'flashcards', label: 'Flashcards', sub: 'Smart review', badge: '12',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="13" rx="2"/><path d="M6 6V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>
      </svg>
    ),
  },
  {
    id: 'quiz', label: 'Knowledge', sub: 'Test yourself',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
]

export default function Sidebar() {
  const { activeView, setActiveView, flashcards } = useNoteStore()
  const [backendOnline, setBackendOnline] = useState(null)

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await api.get('/health')
        if (res.data && res.data.status === 'ok') {
          setBackendOnline(true)
        } else {
          setBackendOnline(false)
        }
      } catch (err) {
        setBackendOnline(false)
      }
    }

    checkHealth()
    const interval = setInterval(checkHealth, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel"
      style={{ width: 230, flexShrink: 0, height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 20 }}
    >
      {/* Ambient bottom glow */}
      <div style={{
        position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)',
        width: 160, height: 100, borderRadius: '50%',
        background: 'radial-gradient(ellipse,rgba(124,58,237,0.12) 0%,transparent 70%)',
        filter: 'blur(30px)', pointerEvents: 'none',
      }}/>

      {/* ── Logo ── */}
      <div style={{ padding: '22px 20px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <motion.div
            whileHover={{ scale: 1.08, rotate: 6 }}
            transition={{ type: 'spring', stiffness: 380, damping: 20 }}
            style={{ flexShrink: 0, cursor: 'pointer', position: 'relative' }}
          >
            {/* Glow halo */}
            <div style={{
              position: 'absolute', inset: -4, borderRadius: 18,
              background: 'rgba(124,58,237,0.25)',
              filter: 'blur(10px)',
              animation: 'preloaderPulse 3s ease-in-out infinite',
            }}/>
            <div style={{
              width: 42, height: 42, borderRadius: 14,
              background: 'linear-gradient(135deg,#3b0764,#5b21b6,#7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
              border: '1px solid rgba(196,181,253,0.2)',
            }}>
              <div style={{ position: 'absolute', inset: 3, borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)' }}/>
              <span style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 22, fontWeight: 700, color: '#fff',
                lineHeight: 1, position: 'relative',
              }}>N</span>
            </div>
          </motion.div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 20, fontWeight: 700, color: '#fff',
              letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 3,
            }}>NoteBot</div>
            <div style={{
              fontSize: 10, fontWeight: 500, color: 'rgba(196,181,253,0.5)',
              letterSpacing: '0.15em', textTransform: 'uppercase',
            }}>Study AI</div>
          </div>

          {/* Backend status */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: backendOnline === true ? '#10b981' : backendOnline === false ? '#f43f5e' : '#f59e0b',
              boxShadow: backendOnline === true ? '0 0 10px rgba(16,185,129,0.7)' : 'none',
              animation: 'preloaderPulse 2.5s ease-in-out infinite',
            }} title={backendOnline === true ? 'Live NLP' : 'Connecting...'}/>
            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {backendOnline === true ? 'live' : backendOnline === false ? 'down' : 'wait'}
            </span>
          </div>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        {NAV.map((item, i) => {
          const active = activeView === item.id
          const cardCount = item.id === 'flashcards' ? flashcards.length : null
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 + 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveView(item.id)}
              whileHover={!active ? { x: 4 } : {}}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                width: '100%', padding: '10px 12px',
                borderRadius: 14,
                cursor: 'pointer', textAlign: 'left',
                position: 'relative',
                background: 'transparent',
                border: 'none',
              }}
            >
              {/* Active background */}
              {active && (
                <motion.div
                  layoutId="nav-bg"
                  style={{
                    position: 'absolute', inset: 0, borderRadius: 14,
                    background: 'linear-gradient(135deg,rgba(124,58,237,0.22),rgba(124,58,237,0.07))',
                    border: '1px solid rgba(124,58,237,0.28)',
                    boxShadow: '0 0 24px rgba(124,58,237,0.16),inset 0 1px 0 rgba(255,255,255,0.07)',
                  }}
                />
              )}
              {/* Active left bar */}
              {active && (
                <motion.div
                  layoutId="nav-bar"
                  style={{
                    position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                    width: 3, height: 24, borderRadius: '0 4px 4px 0',
                    background: 'linear-gradient(180deg,#c4b5fd,#7c3aed)',
                    boxShadow: '0 0 10px rgba(124,58,237,0.9)',
                  }}
                />
              )}

              {/* Icon */}
              <div style={{
                position: 'relative', zIndex: 1,
                width: 34, height: 34, borderRadius: 10,
                display: 'flex', alignItems: 'center', justifycontent: 'center',
                flexShrink: 0,
                background: active ? 'rgba(124,58,237,0.22)' : 'rgba(255,255,255,0.04)',
                color: active ? '#c4b5fd' : '#6b6880',
                boxShadow: active ? '0 0 14px rgba(124,58,237,0.35)' : 'none',
                transition: 'all 0.2s',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {item.icon}
              </div>

              {/* Label */}
              <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontSize: 13, fontWeight: 500, lineHeight: '1.1',
                  marginBottom: 2,
                  color: active ? '#fff' : '#8884a8',
                  transition: 'color 0.15s',
                }}>{item.label}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.sub}</div>
              </div>

              {/* Badge */}
              {cardCount > 0 && (
                <span style={{
                  position: 'relative', zIndex: 1,
                  fontSize: 10, fontWeight: 700, fontFamily: "'Fira Code',monospace",
                  padding: '2px 7px', borderRadius: 99,
                  background: 'rgba(124,58,237,0.18)',
                  color: '#c4b5fd',
                  border: '1px solid rgba(124,58,237,0.28)',
                }}>{cardCount}</span>
              )}
            </motion.button>
          )
        })}
      </nav>

      {/* ── Settings ── */}
      <div style={{ padding: '12px 10px 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 10,
          width: '100%', padding: '9px 12px', borderRadius: 12,
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: '#5a5675', fontSize: 12, fontWeight: 400,
          transition: 'all 0.15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#a8a0c4' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5a5675' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          Settings
        </button>
      </div>
    </motion.aside>
  )
}
