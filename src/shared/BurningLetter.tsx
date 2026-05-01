import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const letterText = `致我最最亲爱的婷婷桑：

在这个普天同庆锣鼓喧天鞭炮齐鸣的日子里，我们迎来了婷婷桑的第一届生诞祭，所以在这里我想好好的跟大家分享一下我眼中的婷婷桑。

什么时候我是开始注意到婷婷桑的呢？我想想算一算大概是半年前的时候，我开始关注到这个如此美好的存在。如果说n队的每个成员都能比作一种花朵的话，婷婷桑就像是一株生长在墙角的兰花，初见时并不惊艳，只是静静的绽放，吐露出丝丝缕缕的幽香。

这么说大概是有些文艺了吧，但是婷婷桑的身上真的是有一种不同于他人的温和又淳朴的气质，在所有的队友里，婷婷桑能与每个人都相处的非常好。

而我非常喜欢这样的温柔的人，所以，对这样温柔的婷婷桑我有些心动了。从一开始只是偶尔去找她玩，只是礼貌性的跟她寒暄，到后来没事就待在她房间里面赖着不走，拿着婷婷桑的海苔啃，偶尔换来她的一脸嫌弃。但是却为能够这样肆意的和她相处，心里而有些窃喜。

在这样的每日的相处中，渐渐的就发现她另外的很多面。看似又呆又淳朴的表面之下，其实偶尔是会被盐一脸的。相处了熟的话，就会发现其实她是傲娇本性，有时候嘴上不说，只是默默做着自己应该做的事情，但是她心里也会有小小的别扭，小小的不甘心，但是她也不会说出来。越是靠近她，就越是想更多的了解她。

直到现在，已经不可自拔了，深深的喜欢上了她。

无论是一心坚定的认为自己是时尚达人的她，（灵魂歌姬什么都是浮云)一心努力的为大家歌唱的她，看似柔弱实际上坚韧不拔的她，全部都最喜欢了！今后也想更多的了解她，走近她。

因为，笑顏が一番，婷婷桑的笑颜在我心里是第一位。

谢谢大家。`

export default function BurningLetter() {
  const [burning, setBurning] = useState(false)
  const [done, setDone] = useState(false)
  const [center, setCenter] = useState<{ x: number; y: number }>({ x: 50, y: 50 })
  const [radius, setRadius] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (burning || done) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setCenter({ x, y })
    setBurning(true)

    const originX = (e.clientX / window.innerWidth)
    const originY = (e.clientY / window.innerHeight)
    confetti({
      particleCount: 90,
      spread: 60,
      startVelocity: 18,
      gravity: 0.4,
      ticks: 90,
      origin: { x: originX, y: originY },
      colors: ['#f97316', '#facc15', '#f97316', '#64748b']
    })

    let current = 0
    const step = () => {
      current += 1.4
      setRadius(current)
      if (current < 120) {
        requestAnimationFrame(step)
      } else {
        setDone(true)
      }
    }
    requestAnimationFrame(step)
  }

  return (
    <div className="relative">
      <AnimatePresence initial={false}>
        {!done && (
          <motion.div
            ref={containerRef}
            onClick={handleClick}
            className={`relative letter-card overflow-hidden ${burning ? 'burning burn-darken' : ''}`}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="fire-flicker" />
            <div className="letter-wax" />
            <div className="relative z-10 space-y-3 text-sm leading-relaxed text-stone-100/90">
              <div className="text-center text-xs uppercase tracking-[0.2em] text-amber-100/60">
                click / tap to burn
              </div>
              <div className="h-px w-full bg-gradient-to-r from-amber-500/0 via-amber-200/40 to-amber-500/0 my-1" />
              <p className="text-base font-medium mb-1">致我最最亲爱的婷婷桑：</p>
              {letterText.split('\n\n').slice(1).map((para, idx) => (
                <p key={idx} className="indent-6 text-[13px] leading-relaxed text-stone-100/85">
                  {para}
                </p>
              ))}
            </div>
            {burning && (
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
      </AnimatePresence>

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mt-6 text-center text-sm text-amber-100/85"
          >
            <div className="inline-block px-5 py-3 rounded-xl border border-amber-100/20 bg-black/40 backdrop-blur-md shadow-lg shadow-amber-500/10">
              <div className="text-xs tracking-[0.18em] uppercase text-amber-200/60 mb-1">
                after the fire
              </div>
              <div className="text-base">
                Merry Christmas，Happy Birthday
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
