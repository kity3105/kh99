import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

type Msg = {
  id: string
  content: string
  ts: number
}

function now() {
  return Date.now()
}

function formatRelative(ts: number) {
  const diff = Math.floor((now() - ts) / 1000)
  if (diff < 10) return '刚刚'
  if (diff < 60) return `${diff} 秒前`
  const m = Math.floor(diff / 60)
  if (m < 60) return `${m} 分钟前`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h} 小时前`
  const d = Math.floor(h / 24)
  if (d < 30) return `${d} 天前`
  const mo = Math.floor(d / 30)
  if (mo < 12) return `${mo} 个月前`
  const y = Math.floor(mo / 12)
  return `${y} 年前`
}

function uid() {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
}

const STORAGE_KEY = 'guestbook_msgs_v2'
const LIMIT = 200

export default function Guestbook() {
  const [content, setContent] = useState('')
  const [shakeContent, setShakeContent] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([])

  useEffect(() => {
    try {
      // 兼容旧版本 v1（带 name/hue），只取必要字段
      const rawV2 = localStorage.getItem(STORAGE_KEY)
      if (rawV2) {
        setMsgs(JSON.parse(rawV2))
        return
      }
      const rawV1 = localStorage.getItem('guestbook_msgs_v1')
      if (rawV1) {
        const arr = JSON.parse(rawV1) as any[]
        const mapped: Msg[] = arr
          .filter(x => x && x.content)
          .map(x => ({ id: x.id || uid(), content: String(x.content), ts: Number(x.ts) || now() }))
        setMsgs(mapped)
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs))
    } catch {}
  }, [msgs])

  const remaining = useMemo(() => LIMIT - content.length, [content])
  const overLimit = remaining < 0

  function publish() {
    const c = content.trim()
    if (!c || overLimit) {
      setShakeContent(true)
      return
    }
    const msg: Msg = { id: uid(), content: c, ts: now() }
    setMsgs([msg, ...msgs])
    setContent('')
    confetti({
      particleCount: 24,
      spread: 36,
      startVelocity: 18,
      scalar: 0.6,
      ticks: 100,
      origin: { x: 0.5, y: 0.65 },
      colors: ['#e879f9', '#c4b5fd', '#f472b6', '#93c5fd']
    })
  }

  function onShakeEnd() {
    setShakeContent(false)
  }

  return (
    <div className="space-y-3">
      <div className="backdrop-blur-card p-3">
        <div className="flex items-center gap-2">
          <motion.input
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="写下留言（单行·200字以内）"
            className="flex-1 rounded-full px-3 py-2 bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40"
            animate={shakeContent ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : undefined}
            transition={{ duration: 0.4 }}
            onAnimationComplete={onShakeEnd}
          />
          <div className={`text-[11px] ${overLimit ? 'text-rose-300' : 'text-white/60'} hidden sm:block`}>
            {Math.max(0, remaining)}
          </div>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={publish}
            className="shrink-0 rounded-full px-3 py-2 bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-400/30 shadow-[0_0_16px_rgba(217,70,239,0.25)] hover:bg-fuchsia-500/30 text-sm"
          >
            发布
          </motion.button>
        </div>
      </div>

      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {msgs.map(m => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="backdrop-blur-card px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <div
                  className="text-sm text-white/90 truncate"
                  title={m.content}
                  style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {m.content}
                </div>
                <div className="text-[11px] text-white/60 shrink-0">
                  {formatRelative(m.ts)}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {msgs.length === 0 && (
          <div className="text-center text-white/60 py-6 text-sm">还没有留言，来留下第一条吧</div>
        )}
      </div>
    </div>
  )
}
