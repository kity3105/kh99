import { useState } from 'react'
import { motion, PanInfo } from 'framer-motion'
import PerspectiveTimeline from '@/shared/timeline/PerspectiveTimeline'
import HeroTop from '@/shared/HeroTop'
import { FocusMode } from '@/types/timeline'

export default function Overview() {
  const [focusMode, setFocusMode] = useState<FocusMode>('both')

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x < -threshold) {
      // 向左滑 -> 聚焦李艺彤 (right)
      if (focusMode === 'left') setFocusMode('both')
      else if (focusMode === 'both') setFocusMode('right')
    } else if (info.offset.x > threshold) {
      // 向右滑 -> 聚焦黄婷婷 (left)
      if (focusMode === 'right') setFocusMode('both')
      else if (focusMode === 'both') setFocusMode('left')
    }
  }

  return (
    <motion.div 
      className="space-y-4"
      onPanEnd={handleDragEnd}
    >
      <HeroTop focusMode={focusMode} />
      <PerspectiveTimeline 
        density="low" 
        focusMode={focusMode} 
        onFocusChange={setFocusMode}
      />
    </motion.div>
  )
}
