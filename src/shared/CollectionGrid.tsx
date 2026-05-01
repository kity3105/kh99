import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import confetti from 'canvas-confetti'

type Entry = {
  id: number
  title: string
  text: string
  enableBurn?: boolean
}

const letterText1 = `致我最最亲爱的婷婷桑：

在这个普天同庆锣鼓喧天鞭炮齐鸣的日子里，我们迎来了婷婷桑的第一届生诞祭，所以在这里我想好好的跟大家分享一下我眼中的婷婷桑。

什么时候我是开始注意到婷婷桑的呢？我想想算一算大概是半年前的时候，我开始关注到这个如此美好的存在。如果说n队的每个成员都能比作一种花朵的话，婷婷桑就像是一株生长在墙角的兰花，初见时并不惊艳，只是静静的绽放，吐露出丝丝缕缕的幽香。

这么说大概是有些文艺了吧，但是婷婷桑的身上真的是有一种不同于他人的温和又淳朴的气质，在所有的队友里，婷婷桑能与每个人都相处的非常好。

而我非常喜欢这样的温柔的人，所以，对这样温柔的婷婷桑我有些心动了。从一开始只是偶尔去找她玩，只是礼貌性的跟她寒暄，到后来没事就待在她房间里面赖着不走，拿着婷婷桑的海苔啃，偶尔换来她的一脸嫌弃。但是却为能够这样肆意的和她相处，心里而有些窃喜。

在这样的每日的相处中，渐渐的就发现她另外的很多面。看似又呆又淳朴的表面之下，其实偶尔是会被盐一脸的。相处了熟的话，就会发现其实她是傲娇本性，有时候嘴上不说，只是默默做着自己应该做的事情，但是她心里也会有小小的别扭，小小的不甘心，但是她也不会说出来。越是靠近她，就越是想更多的了解她。

直到现在，已经不可自拔了，深深的喜欢上了她。

无论是一心坚定的认为自己是时尚达人的她，（灵魂歌姬什么都是浮云)一心努力的为大家歌唱的她，看似柔弱实际上坚韧不拔的她，全部都最喜欢了！今后也想更多的了解她，走近她。

因为，笑顏が一番，婷婷桑的笑颜在我心里是第一位。

谢谢大家。`

const letterText2 = `
十年后的黄婷婷不能去恨十年前的李艺彤，就像大人不能和小孩子计较，爱和恨有了年限就过期了，再拆封味道也淡得无趣。

十年后的黄婷婷更不能恨十年后的李艺彤，因为她其实只认识十年前的李艺彤。

怪罪一个陌生人，是很没道理的事情。

全文打开lofter搜索《当htt看到卡黄的热搜以后》`

const letterText3 = `
年少时钟情一个人的方式总是热烈而莽撞，空有信念却匮乏资本。想和对方天长地久，想撇开除彼此之外的任何都不管。然而有一天，离开了那个人，可能是加班到深夜，独自坐在空无一人的地铁上，可能是当经过那家有个很像她却不是她的店员的7-11，妳忽然就明白了。日子还是要过，生活没有那么多非谁不可。

「不是妳，谁都不行」和「不是妳的话，谁都可以」，说到底是同一件事情。

李艺彤不擅长说乞求的话。通常都是，黄婷婷妳会剥虾吗妳可以帮我剥虾吗，黄婷婷妳会取钱吗妳可以帮我取钱吗，黄婷婷妳会洗衣服吗妳可以帮我洗衣服吗，诸如此类。

全文打开lofter搜索《喜 宴》`

const ENTRIES: Entry[] = [
  { id: 1, title: '致婷婷桑', text: letterText1, enableBurn: true },
  { id: 2, title: '当htt看到卡黄的热搜以后', text: letterText2 },
  { id: 3, title: '喜 宴', text: letterText3 }
]

export default function CollectionGrid() {
  const [active, setActive] = useState<Entry | null>(null)
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {ENTRIES.map((e) => (
          <button
            key={e.id}
            onClick={() => setActive(e)}
            className="group rounded-2xl border px-3 py-8 text-center text-sm text-white/90
              border-fuchsia-400/25 hover:border-fuchsia-300/50
              shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:shadow-[0_0_30px_rgba(244,114,182,0.15)]
              bg-white/5 hover:bg-white/8 transition-all duration-300 backdrop-blur-md"
          >
            <div className="font-medium">{e.title}</div>
            <div className="mt-1 text-[11px] text-white/60">点击进入</div>
          </button>
        ))}
      </div>
      <AnimatePresence>{active && <LetterModal entry={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </>
  )
}

function LetterModal({ entry, onClose }: { entry: Entry; onClose: () => void }) {
  const [burning, setBurning] = useState(false)
  const [phase, setPhase] = useState<'reading' | 'burning' | 'clean'>('reading')
  const [center, setCenter] = useState({ x: 50, y: 50 })
  const [radius, setRadius] = useState(0)
  const panelRef = useRef<HTMLDivElement | null>(null)

  function handleBurnStart(e: React.MouseEvent<HTMLDivElement>) {
    if (!entry.enableBurn || burning || phase !== 'reading') return
    setBurning(true)
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setCenter({ x, y })

    const base = { particleCount: 40, spread: 25, decay: 0.92, scalar: 0.6, ticks: 180, gravity: 0.85, startVelocity: 8, colors: ['#f59e0b', '#f97316', '#78350f', '#64748b'] }
    const origin = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
    confetti({ ...base, origin })
    setTimeout(() => confetti({ ...base, particleCount: 30, spread: 35, origin }), 150)
    setTimeout(() => confetti({ ...base, particleCount: 20, spread: 45, decay: 0.94, gravity: 0.95, origin }), 350)

    let r = 0
    const grow = () => {
      r += 0.9
      setRadius(r)
      if (r < 120) {
        requestAnimationFrame(grow)
      } else {
        setPhase('clean')
        setBurning(false)
      }
    }
    requestAnimationFrame(grow)
    setPhase('burning')
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      <motion.div
        ref={panelRef}
        className="relative z-10 w-[92vw] max-w-[720px]"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <button
          onClick={onClose}
          className="absolute right-2 top-2 z-20 rounded-full p-2 bg-black/40 hover:bg-black/50 border border-white/10 text-white/80"
          aria-label="close"
        >
          <X size={18} />
        </button>

        {phase !== 'clean' && (
          <motion.div
            className={`letter-card rounded-2xl overflow-hidden ${burning ? 'burning burn-darken' : ''}`}
            onClick={handleBurnStart}
          >
            <div className="fire-flicker" />
            <div className="letter-wax" />
     {/* --- 文本框 --- */}
    <div className="relative z-10 flex flex-col h-[60vh]"> {/* 设置一个固定高度，比如屏幕高度的60% */}
      <div className="text-center text-xs uppercase tracking-[0.2em] text-amber-100/60 pt-4 pb-2">
        {entry.enableBurn ? 'click / tap to burn' : entry.title}
      </div>
      
      <div className="h-px w-full bg-gradient-to-r from-amber-500/0 via-amber-200/40 to-amber-500/0 mb-4" />

      {/* 文字滚动区域 */}
      <div className="flex-1 overflow-y-auto px-2 custom-scrollbar mask-edge-fade">
        <div className="space-y-4 pb-6">
          {entry.text.split('\n\n').map((para, idx) => (
            <p key={idx} className="indent-6 text-[15px] leading-relaxed text-stone-100/90 font-serif">
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
    {/* --- 核心修改部分结束 --- */}
            {entry.enableBurn && phase === 'burning' && (
              <div
                className="absolute inset-0 burn-ash"
                style={
                  {
                    '--bx': `${center.x}%`,
                    '--by': `${center.y}%`,
                    '--br': radius
                  } as React.CSSProperties
                }
              />
            )}
          </motion.div>
        )}

        {phase === 'clean' && (
          <motion.div
            className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md px-6 py-8 text-center shadow-xl shadow-amber-500/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="text-xs tracking-[0.18em] uppercase text-amber-200/60 mb-2">
              after the fire
            </div>
            <div className="text-lg text-amber-100/90">
              Merry Christmas，Happy Birthday
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
