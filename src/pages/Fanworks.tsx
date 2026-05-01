import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ExternalLink, Pin } from 'lucide-react'
import { GROUPS, ZHI_TING_TING_SANG } from '@/shared/bichibang'

export default function Fanworks() {
  const [isTopExpanded, setIsTopExpanded] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<string[]>([])

  const toggleGroup = (name: string) => {
    setExpandedGroups(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    )
  }

  return (
    <div className="pb-12">
      {/* --- 1. Header 背景区域 --- */}
      <div className="relative h-[50vh] sm:h-[60vh] w-full overflow-hidden z-0">
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: "url('/photo/fanswork%20top.JPG')",
          }}
        />
        {/* 自然过渡渐变层: 从透明消融到背景色 */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-b from-transparent to-[#050510]" />
      </div>

      {/* --- 2. 内容区域 --- */}
      <div className="relative z-10 -mt-20 px-4 max-w-2xl mx-auto">
        <div className="space-y-6">
          {/* --- 🔝 置顶 --- */}
          <div className="backdrop-blur-card border border-amber-500/30 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.1)]">
            <button 
              onClick={() => setIsTopExpanded(!isTopExpanded)}
              className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-white/5"
            >
              <div className="flex items-center gap-3">
                <Pin className="text-amber-400 rotate-45" size={20} />
                <div>
                  <span className="text-white font-bold">【致婷婷桑】</span>
                  <span className="text-gray-400 text-sm ml-1">（正主下场亲自写的镇圈神文）</span>
                </div>
              </div>
              <ChevronDown className={`text-white/40 transition-transform duration-300 ${isTopExpanded ? 'rotate-180' : ''}`} size={20} />
            </button>
            
            <AnimatePresence>
              {isTopExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 pt-2 border-t border-white/5">
                    <a 
                      href="https://www.bilibili.com/video/BV16s411y7v3" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-fuchsia-300 hover:text-fuchsia-200 text-sm mb-6 bg-fuchsia-500/10 px-3 py-1.5 rounded-full border border-fuchsia-500/20"
                    >
                      <ExternalLink size={14} />
                      点击前往观看视频版
                    </a>
                    <div className="space-y-4 text-white/80 font-serif leading-relaxed text-sm whitespace-pre-wrap">
                      {ZHI_TING_TING_SANG}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- 分组列表 --- */}
          {GROUPS.map((group) => (
            <div key={group.name} className="backdrop-blur-card border border-white/10 rounded-2xl overflow-hidden">
              <button 
                onClick={() => toggleGroup(group.name)}
                className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-white/5"
              >
                <span className="text-purple-300 font-medium">{group.name}</span>
                <ChevronDown className={`text-white/40 transition-transform duration-300 ${expandedGroups.includes(group.name) ? 'rotate-180' : ''}`} size={18} />
              </button>
              
              <AnimatePresence>
                {expandedGroups.includes(group.name) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="divide-y divide-white/5 px-4 pb-2">
                      {group.items.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-4 group transition-all"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <span className="text-white group-hover:text-fuchsia-300 transition-colors">【{item.title}】</span>
                              <span className="text-gray-400 text-xs ml-1">{item.description}</span>
                            </div>
                            <ExternalLink size={14} className="text-white/20 group-hover:text-fuchsia-300 mt-1 flex-shrink-0" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
