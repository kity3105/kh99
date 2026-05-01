import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export type TimelineSearchItem = {
  id: string
  date: string
  title: string
  year: string
  searchText: string
}

type Props = {
  items: TimelineSearchItem[]
  onSelect: (item: TimelineSearchItem) => void
}

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="bg-fuchsia-500/30 text-fuchsia-200 rounded px-0.5">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

function getScore(item: TimelineSearchItem, query: string) {
  const q = query.toLowerCase()
  const title = item.title.toLowerCase()
  const date = item.date.toLowerCase()
  const text = item.searchText.toLowerCase()

  let score = 0

  if (title === q) score += 120
  if (title.startsWith(q)) score += 80
  if (title.includes(q)) score += 50
  if (date.includes(q)) score += 30
  if (text.includes(q)) score += 10

  return score
}

export default function TimelineSearch({ items, onSelect }: Props) {
  const [inputValue, setInputValue] = useState('')
  const [query, setQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setQuery(inputValue.trim())
    }, 220)

    return () => window.clearTimeout(timer)
  }, [inputValue])

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
        setIsDropdownOpen(true)
      }
    }

    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  const filteredResults: TimelineSearchItem[] = useMemo(() => {
    if (!query.trim()) return []

    return [...items]
      .filter((item) => getScore(item, query) > 0)
      .sort((a, b) => getScore(b, query) - getScore(a, query))
  }, [items, query])

  const handleResultClick = (item: TimelineSearchItem) => {
    onSelect(item)
    setInputValue('')
    setQuery('')
    setIsDropdownOpen(false)
    setShowAll(false)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const displayResults = showAll ? filteredResults : filteredResults.slice(0, 10)

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
        <input
          ref={inputRef}
          type="text"
          placeholder="搜索时间线，支持 Command/Ctrl + K"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            setIsDropdownOpen(true)
            setShowAll(false)
          }}
          onFocus={() => setIsDropdownOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsDropdownOpen(false)
              inputRef.current?.blur()
            }
            if (e.key === 'Enter' && filteredResults.length > 0) {
              handleResultClick(filteredResults[0])
            }
          }}
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40
            focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-400/50"
        />
        {inputValue && (
          <button
            onClick={() => {
              setInputValue('')
              setQuery('')
              setIsDropdownOpen(false)
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={16} className="text-white/40" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isDropdownOpen && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[60vh]"
          >
            {filteredResults.length > 0 ? (
              <>
                <div className="max-h-[50vh] overflow-y-auto custom-scrollbar">
                  {displayResults.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleResultClick(item)}
                  className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors flex items-start gap-3 border-b border-white/5 last:border-0"
                >
                  <div className="text-xs font-mono text-fuchsia-400 bg-fuchsia-400/10 px-2 py-1 rounded mt-0.5 shrink-0">
                    <HighlightText text={item.date} query={query} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white truncate">
                      <HighlightText text={item.title} query={query} />
                    </div>
                    {item.year && (
                      <div className="text-xs text-white/50 mt-1">
                        {item.year}年
                      </div>
                    )}
                  </div>
                </button>
                  ))}
                </div>

                {filteredResults.length > 10 && (
                  <div className="border-t border-white/5">
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className="w-full py-3 text-sm text-fuchsia-300 hover:text-fuchsia-200 hover:bg-white/5 transition-colors"
                    >
                      {showAll ? '收起' : `查看更多 (${filteredResults.length - 10} 项)`}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="px-4 py-5 text-sm text-white/50">未找到相关事件</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
