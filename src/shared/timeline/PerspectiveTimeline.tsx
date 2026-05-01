import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FocusMode } from '@/types/timeline'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { ALL_YEARS, getEventImages, type TimelineEvent as SourceTimelineEvent } from '@/data/timeline'
import TimelineSearch, { type TimelineSearchItem } from './TimelineSearch'

type Props = {
  density: 'low' | 'high'
  focusMode?: FocusMode
  onFocusChange?: (mode: FocusMode) => void
}

type DisplayEvent = {
  id: string
  date: string
  title: string
  centerContent?: string
  leftContent?: string
  rightContent?: string
  detailText?: string
  images?: string[]
}

type DisplayYearData = {
  year: string
  summary: string
  events: DisplayEvent[]
}

type LightboxState = {
  images: string[]
  index: number
  title: string
}

function splitPrimaryAndDetail(text: string) {
  const chunks = text
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)

  return {
    primary: chunks[0] || '',
    detail: chunks.slice(1).join('\n\n')
  }
}

function toDisplayEvent(event: SourceTimelineEvent): DisplayEvent {
  let body = event.content.trim()
  const titlePrefix = `${event.title}\n\n`

  if (body.startsWith(titlePrefix)) {
    body = body.slice(titlePrefix.length)
  } else if (body === event.title) {
    body = ''
  }

  const leftMarker = '【黄婷婷视角】'
  const rightMarker = '【李艺彤视角】'
  const leftIndex = body.indexOf(leftMarker)
  const rightIndex = body.indexOf(rightMarker)

  let leftContent = ''
  let rightContent = ''
  let detailText = ''

  if (leftIndex !== -1 && rightIndex !== -1) {
    if (leftIndex < rightIndex) {
      leftContent = body.slice(leftIndex + leftMarker.length, rightIndex).trim()

      const rightBlock = body.slice(rightIndex + rightMarker.length).trim()
      const rightParts = splitPrimaryAndDetail(rightBlock)
      rightContent = rightParts.primary
      detailText = rightParts.detail
    } else {
      rightContent = body.slice(rightIndex + rightMarker.length, leftIndex).trim()

      const leftBlock = body.slice(leftIndex + leftMarker.length).trim()
      const leftParts = splitPrimaryAndDetail(leftBlock)
      leftContent = leftParts.primary
      detailText = leftParts.detail
    }
  } else if (leftIndex !== -1) {
    const leftBlock = body.slice(leftIndex + leftMarker.length).trim()
    const leftParts = splitPrimaryAndDetail(leftBlock)
    leftContent = leftParts.primary
    detailText = leftParts.detail
  } else if (rightIndex !== -1) {
    const rightBlock = body.slice(rightIndex + rightMarker.length).trim()
    const rightParts = splitPrimaryAndDetail(rightBlock)
    rightContent = rightParts.primary
    detailText = rightParts.detail
  } else {
    detailText = body
  }

  return {
    id: event.id,
    date: event.date,
    title: event.title,
    centerContent: event.title,
    leftContent: leftContent || undefined,
    rightContent: rightContent || undefined,
    detailText: detailText || undefined,
    images: getEventImages(event.date, event.imageCount)
  }
}

function YearSection({ 
  yearData, 
  focusMode, 
  onEventClick,
  highlightedEventId
}: { 
  yearData: DisplayYearData,
  focusMode: FocusMode, 
  onEventClick: (e: DisplayEvent) => void
  highlightedEventId: string | null
}) {
  return (
    <section 
      id={`year-${yearData.year}`} 
      className="relative py-12 border-b border-white/5 min-h-[100px]"
    >
      {/* 年份标题与总结 (居中固定) */}
      <div className="sticky top-32 z-20 pointer-events-none mb-0">
        <div className="section-container flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl font-black text-white/10 tracking-tighter"
          >
            {yearData.year}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs text-white/40 max-w-xs mt-2"
          >
            {yearData.summary}
          </motion.p>
        </div>
      </div>

      {/* 事件列表 */}
      <div className="relative z-10 space-y-8 mt-0">
        {yearData.events.length > 0 ? (
          yearData.events.map((event) => (
            <motion.div 
              key={event.id}
              id={`timeline-event-${event.id}`}
              onClick={() => onEventClick(event)}
              className={`flex flex-col min-h-[100px] relative overflow-visible cursor-pointer group rounded-2xl px-2 py-3 transition-all duration-300 ${
                highlightedEventId === event.id ? 'timeline-event-highlight' : ''
              }`}
              whileHover={{ scale: 1.002 }}
              transition={{ duration: 0.2 }}
            >
              {/* --- 顶部层 (Center Header) --- */}
              <div className="w-full flex flex-col items-center mb-4 relative z-20">
                {/* 日期 (纯文字居中) */}
                <div className="text-[11px] text-fuchsia-400 font-mono tracking-widest uppercase mb-1 text-center">
                  {event.date}
                </div>
                
                {/* 中心标题 */}
                {event.centerContent && (
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="relative py-1 px-12 text-center transition-all duration-300"
                  >
                    <div className="text-sm font-bold leading-tight tracking-widest text-white/90">
                      {event.centerContent}
                    </div>
                  </motion.div>
                )}
                
                {!event.centerContent && (
                  <div className="w-12 h-[1px] bg-white/5 mt-2" />
                )}
              </div>

              {/* --- 下方层 (Interaction Row) --- */}
              <div className="flex w-full relative">
                {/* 左侧内容容器 (黄) */}
                <motion.div
                  layout
                  animate={{
                    width: focusMode === 'left' ? '90%' : focusMode === 'right' ? '10%' : '50%',
                  }}
                  className={`relative z-10 flex items-start justify-end pr-8 pl-4 transition-all duration-500 
                    ${focusMode === 'right' ? 'opacity-20 grayscale' : 'opacity-100'}
                  `}
                >
                  <AnimatePresence mode="wait">
                    {focusMode !== 'right' && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="text-right w-full py-1"
                      >
                        {event.leftContent && (
                          <div className="text-sm font-medium text-yellow-400 leading-relaxed max-w-[90%] ml-auto"
                          >
                            {event.leftContent}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {focusMode === 'right' && (
                    <div className="w-full h-px bg-yellow-400/20 self-center" />
                  )}
                </motion.div>

                {/* 右侧内容容器 (卡) */}
                <motion.div
                  layout
                  animate={{
                    width: focusMode === 'right' ? '90%' : focusMode === 'left' ? '10%' : '50%',
                  }}
                  className={`relative z-10 flex items-start justify-start pl-8 pr-4 transition-all duration-500 
                    ${focusMode === 'left' ? 'opacity-20 grayscale' : 'opacity-100'}
                  `}
                >
                  <AnimatePresence mode="wait">
                    {focusMode !== 'left' && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="text-left w-full py-1"
                      >
                        {event.rightContent && (
                          <div className="text-sm font-medium text-red-500 leading-relaxed max-w-[90%] mr-auto"
                          >
                            {event.rightContent}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {focusMode === 'left' && (
                    <div className="w-full h-px bg-red-500/20 self-center" />
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="h-40 flex items-center justify-center opacity-20 italic text-xs">
            No key events recorded for this year.
          </div>
        )}
      </div>
    </section>
  )
}

export default function PerspectiveTimeline({ density: _density, focusMode: externalFocusMode, onFocusChange }: Props) {
  const [internalFocusMode, setInternalFocusMode] = useState<FocusMode>('both')
  const [selectedEvent, setSelectedEvent] = useState<DisplayEvent | null>(null)
  const [highlightedEventId, setHighlightedEventId] = useState<string | null>(null)
  const [lightboxState, setLightboxState] = useState<LightboxState | null>(null)

  const focusMode = externalFocusMode || internalFocusMode
  const setFocusMode = onFocusChange || setInternalFocusMode

  const timelineData: DisplayYearData[] = useMemo(
    () =>
      ALL_YEARS.map((year) => ({
        year: String(year.year),
        summary: '',
        events: year.events.map(toDisplayEvent)
      })),
    []
  )
  const years = timelineData.map(d => d.year)
  const searchItems: TimelineSearchItem[] = useMemo(
    () =>
      timelineData.flatMap((yearData) =>
        yearData.events.map((event) => ({
          id: event.id,
          date: event.date,
          title: event.title,
          year: yearData.year,
          searchText: [event.title, event.leftContent, event.rightContent, event.detailText]
            .filter(Boolean)
            .join(' ')
        }))
      ),
    [timelineData]
  )

  useEffect(() => {
    if (!highlightedEventId) return

    const timeout = window.setTimeout(() => {
      setHighlightedEventId(null)
    }, 1800)

    return () => window.clearTimeout(timeout)
  }, [highlightedEventId])

  useEffect(() => {
    if (!selectedEvent && !lightboxState) return

    const handleEscapeClose = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (lightboxState) {
          setLightboxState(null)
          return
        }
        setSelectedEvent(null)
      }

      if (lightboxState && event.key === 'ArrowLeft') {
        event.preventDefault()
        setLightboxState((current) => {
          if (!current || current.images.length <= 1) return current
          return {
            ...current,
            index: (current.index - 1 + current.images.length) % current.images.length
          }
        })
      }

      if (lightboxState && event.key === 'ArrowRight') {
        event.preventDefault()
        setLightboxState((current) => {
          if (!current || current.images.length <= 1) return current
          return {
            ...current,
            index: (current.index + 1) % current.images.length
          }
        })
      }
    }

    window.addEventListener('keydown', handleEscapeClose)
    return () => window.removeEventListener('keydown', handleEscapeClose)
  }, [selectedEvent, lightboxState])

  const scrollToElementWithOffset = (element: HTMLElement | null) => {
    if (!element) return

    const stickyOffset = 170
    const top = element.getBoundingClientRect().top + window.scrollY - stickyOffset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const handleYearJump = (year: string) => {
    const anchor = document.getElementById(`anchor-${year}`)
    if (anchor) {
      scrollToElementWithOffset(anchor)
    }
  }

  const handleSearchSelect = (item: TimelineSearchItem) => {
    const element = document.getElementById(`timeline-event-${item.id}`)
    if (!element) return

    scrollToElementWithOffset(element)

    window.setTimeout(() => {
      setHighlightedEventId(item.id)
    }, 450)
  }

  return (
    <div className="relative min-h-screen text-white pb-20 -mt-6">
      {/* --- 第一部分：置顶控制台 (Sticky Control Hub) --- */}
      <div className="sticky top-0 z-40 w-full backdrop-blur-xl bg-black/60 border-b border-white/10 pb-2">
        <div className="section-container !py-3 !pt-2 flex flex-col items-center gap-4">
          <div className="w-full max-w-lg">
            <TimelineSearch items={searchItems} onSelect={handleSearchSelect} />
          </div>

          {/* 三色切换滑块 */}
          <div className="relative w-48 h-10 bg-white/5 rounded-full flex p-1 border border-white/5">
            <motion.div
              layout
              initial={false}
              animate={{
                x: focusMode === 'left' ? 0 : focusMode === 'both' ? '100%' : '200%',
                backgroundColor: focusMode === 'left' ? '#FFD306' : focusMode === 'both' ? '#6B7280' : '#a81e32'
              }}
              className="absolute top-1 bottom-1 left-1 w-[calc(33.33%-2.6px)] rounded-full shadow-lg"
            />
            
            <button 
              onClick={() => setFocusMode('left')}
              className={`relative z-10 flex-1 text-[10px] font-bold transition-colors ${focusMode === 'left' ? 'text-black' : 'text-white/60'}`}
            >
              黄
            </button>
            <button 
              onClick={() => setFocusMode('both')}
              className={`relative z-10 flex-1 text-[10px] font-bold transition-colors ${focusMode === 'both' ? 'text-white' : 'text-white/60'}`}
            >
              合
            </button>
            <button 
              onClick={() => setFocusMode('right')}
              className={`relative z-10 flex-1 text-[10px] font-bold transition-colors ${focusMode === 'right' ? 'text-white' : 'text-white/60'}`}
            >
              卡
            </button>
          </div>

          {/* 年份导航 */}
          <div className="w-full overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-between min-w-max px-2 gap-3">
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => handleYearJump(year)}
                  className="text-[10px] text-white/40 hover:text-white transition-colors py-1 px-2 rounded-md hover:bg-white/5"
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="flex flex-col">
          {timelineData.map(data => (
            <div key={data.year} className="relative">
              <div
                id={`anchor-${data.year}`}
                className="absolute -top-32 h-px w-px pointer-events-none opacity-0"
                aria-hidden="true"
              />
              <YearSection 
                yearData={data}
                focusMode={focusMode}
                onEventClick={setSelectedEvent}
                highlightedEventId={highlightedEventId}
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- 第三部分：详情弹窗 (Modal) --- */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl bg-black/80"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[85vh] bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute right-5 top-5 z-20 p-2 rounded-full bg-black/55 text-white/60 hover:text-white transition-colors"
                aria-label="关闭弹窗"
              >
                <X size={20} />
              </button>

              <div className="max-h-[85vh] overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
                <div className="pt-2 pb-2 pr-12">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono text-fuchsia-400 bg-fuchsia-400/10 px-2 py-1 rounded">
                      {selectedEvent.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {selectedEvent.title}
                  </h3>
                  <div className="space-y-4 text-sm leading-relaxed font-serif text-white/70">
                    {selectedEvent.leftContent && (
                      <div>
                        <div className="mb-1 text-xs tracking-widest text-yellow-300/80">黄婷婷</div>
                        <p>{selectedEvent.leftContent}</p>
                      </div>
                    )}
                    {selectedEvent.rightContent && (
                      <div>
                        <div className="mb-1 text-xs tracking-widest text-red-300/80">李艺彤</div>
                        <p>{selectedEvent.rightContent}</p>
                      </div>
                    )}
                    {selectedEvent.detailText && <p>{selectedEvent.detailText}</p>}
                  </div>
                </div>

                {selectedEvent.images && selectedEvent.images.length > 0 && (
                  <div className="mt-8 px-1">
                    <div className="columns-1 gap-4 sm:columns-2">
                      {selectedEvent.images.map((imagePath, index) => (
                        <div key={imagePath} className="mb-4 break-inside-avoid">
                          <img
                            src={imagePath}
                            alt={`${selectedEvent.title} 图片 ${index + 1}`}
                            className="block w-full h-auto max-h-[70vh] object-contain rounded-xl cursor-zoom-in"
                            onClick={(event) => {
                              event.stopPropagation()
                              setLightboxState({
                                images: selectedEvent.images || [],
                                index,
                                title: selectedEvent.title
                              })
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightboxState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightboxState(null)}
          >
            <button
              onClick={() => setLightboxState(null)}
              className="absolute right-5 top-5 z-20 p-2 rounded-full bg-white/10 text-white/80 hover:bg-white/15 hover:text-white transition-colors"
              aria-label="关闭大图预览"
            >
              <X size={22} />
            </button>

            {lightboxState.images.length > 1 && (
              <button
                onClick={(event) => {
                  event.stopPropagation()
                  setLightboxState((current) => {
                    if (!current) return current
                    return {
                      ...current,
                      index: (current.index - 1 + current.images.length) % current.images.length
                    }
                  })
                }}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/80 hover:bg-white/15 hover:text-white transition-colors"
                aria-label="上一张"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <div
              className="flex max-h-full max-w-full items-center justify-center"
              onClick={() => setLightboxState(null)}
            >
              <img
                src={lightboxState.images[lightboxState.index]}
                alt={`${lightboxState.title} 大图 ${lightboxState.index + 1}`}
                className="max-h-[88vh] max-w-[92vw] object-contain"
              />
            </div>

            {lightboxState.images.length > 1 && (
              <button
                onClick={(event) => {
                  event.stopPropagation()
                  setLightboxState((current) => {
                    if (!current) return current
                    return {
                      ...current,
                      index: (current.index + 1) % current.images.length
                    }
                  })
                }}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/80 hover:bg-white/15 hover:text-white transition-colors"
                aria-label="下一张"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 底部渐变 */}
      <div className="h-64 flex flex-col items-center justify-start pt-20">
        <div className="w-[2px] h-32 bg-gradient-to-b from-fuchsia-500/50 to-transparent animate-pulse" />
        <span className="text-[10px] text-fuchsia-400/50 tracking-widest uppercase mt-4">Continuing...</span>
      </div>
      <style>{`
        .timeline-event-highlight {
          animation: timelineEventFlash 1.4s ease-out 2;
          border-color: rgba(217, 70, 239, 0.45);
        }

        @keyframes timelineEventFlash {
          0%,
          100% {
            box-shadow: 0 0 0 rgba(217, 70, 239, 0);
            background: rgba(255, 255, 255, 0);
          }

          50% {
            box-shadow:
              0 0 0 1px rgba(217, 70, 239, 0.35),
              0 0 32px rgba(217, 70, 239, 0.22);
            background: rgba(217, 70, 239, 0.06);
          }
        }
      `}</style>
    </div>
  )
}
