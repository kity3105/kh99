import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopImg from '../assets/IMG_top.png'
import { FocusMode } from '@/types/timeline'

type Props = {
  focusMode?: FocusMode
}

export default function HeroTop({ focusMode = 'both' }: Props) {
  return (
    <div className="relative pb-2 overflow-hidden" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <motion.div 
        animate={{
          x: focusMode === 'left' ? '40%' : focusMode === 'right' ? '-40%' : '0%',
          scale: focusMode === 'both' ? 1 : 1.1
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative z-0"
      >
        <div className="absolute left-1/2 bottom-10 -translate-x-1/2 z-10 flex items-center gap-20">
          <motion.div
            animate={{ opacity: focusMode === 'right' ? 0 : 1 }}
          >
            <Link to="/profiles?v=htt" className="text-2xl font-semibold glow-gradient-text">黄婷婷</Link>
          </motion.div>
          <motion.div
            animate={{ opacity: focusMode === 'left' ? 0 : 1 }}
          >
            <Link to="/profiles?v=lyt" className="text-2xl font-semibold glow-gradient-text">李艺彤</Link>
          </motion.div>
        </div>
        <img
          src={TopImg}
          alt="卡黄"
          className="w-full h-auto mask-fade-bottom select-none pointer-events-none"
          draggable={false}
        />
      </motion.div>
    </div>
  )
}
