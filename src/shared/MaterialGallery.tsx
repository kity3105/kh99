import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Search as SearchIcon, X } from 'lucide-react'

type Category = { id: string; name: string; icon: string }
type Material = { category: string; title: string; url: string; tag: string; date: string }

const MATERIAL_CATEGORIES: Category[] = [
  { id: 'stage', name: '舞台/MV/花絮', icon: '🎬' },
  { id: 'variety', name: '综艺/外务', icon: '📺' },
  { id: 'theater', name: '剧场公演', icon: '🎭' },
  { id: 'interview', name: '采访', icon: '🎤' },
  { id: 'extra', name: '丝芭延伸物料', icon: '✨' }
]

const MATERIALS: Material[] = [
  { category: 'stage', title: '《夜蝶1.0》官摄版', url: 'https://www.bilibili.com/video/BV1ZWk6B7Era/', tag: '官摄', date: '2015.01.31' },
  { category: 'stage', title: '《夜蝶2.0》官摄版', url: 'https://www.bilibili.com/video/BV1y8F6eyEAq/', tag: '官摄', date: '2015.12.26' },
  { category: 'stage', title: '《夜蝶》官方正式版MV', url: 'https://www.bilibili.com/video/BV12s411Q7k1/', tag: 'MV', date: '2017.03.17' },
  { category: 'stage', title: '《夜蝶2.0》+MC (右看台视角)', url: 'https://www.bilibili.com/video/BV1Ds4119784/', tag: '粉摄', date: '2015.12.26' },
  { category: 'stage', title: '《夜蝶2.0》+MC (内场视角)', url: 'https://www.bilibili.com/video/BV1K5411H7r4/', tag: '粉摄', date: '2015.12.26' },
  { category: 'stage', title: '《夜蝶2.0》 (左看台视角)', url: 'https://www.bilibili.com/video/BV1X6ZnBZEYu/', tag: '粉摄', date: '2015.12.26' },
  { category: 'stage', title: '《夜蝶》拍摄花絮1', url: 'https://www.bilibili.com/video/BV1fs411Q7mq/', tag: '花絮', date: '2017' },
  { category: 'stage', title: '《夜蝶》拍摄花絮2', url: 'https://www.bilibili.com/video/BV1Bs411r78Q/', tag: '花絮', date: '2017' },
  { category: 'stage', title: '《夜蝶是个什么鬼》', url: 'https://www.bilibili.com/video/BV1ms411Q7aU/', tag: '花絮', date: '2017' },
  { category: 'stage', title: '《爱恨的泪》2014公演版', url: 'https://www.bilibili.com/video/BV1xk4y1x7mC/', tag: '公演', date: '2014.11.30' },
  { category: 'stage', title: '《爱恨的泪》第三届金曲大赏', url: 'https://www.bilibili.com/video/BV1ws411h7Q9/', tag: '舞台', date: '2017.01.07' },
  { category: 'stage', title: '《爱恨的泪》金曲大赏4K重制', url: 'https://www.bilibili.com/video/BV19uKHz7Evs/', tag: '舞台', date: '2017.01.07' },
  { category: 'stage', title: '《人鱼》官摄正式版', url: 'https://www.bilibili.com/video/BV1pW411J7FU/', tag: '舞台', date: '2018.02.03' },
  { category: 'stage', title: '《人鱼》消音无call版', url: 'https://www.bilibili.com/video/BV1kKPXeWEdj/', tag: '舞台', date: '2018.02.03' },
  { category: 'stage', title: '【卡黄MV大合集】全收录', url: 'https://www.bilibili.com/video/BV1UV411277C/', tag: '合集', date: '2014-2018' },
  { category: 'variety', title: '《上海学院48》卡黄Cut (E23/25)', url: 'https://www.bilibili.com/video/BV1a29hYnEH2/', tag: '综艺', date: '2014' },
  { category: 'variety', title: '《周刊少女SNH》第二期', url: 'https://www.bilibili.com/video/BV1hM41157qY/', tag: '综艺', date: '2015.07.03' },
  { category: 'variety', title: '《快乐大本营》SNH48特辑', url: 'https://www.bilibili.com/video/BV1FLB5YCEXd/', tag: '综艺', date: '2016.09.10' },
  { category: 'variety', title: '卡黄新闻台播报梦幻新闻', url: 'https://www.bilibili.com/video/BV1Fs411r7gB/', tag: '外务', date: '2016.09.05' },
  { category: 'theater', title: '《剧场女神》-《前所未有》卡黄合辑', url: 'https://www.bilibili.com/video/BV17t411u74p/', tag: '公演', date: '2014-2015' },
  { category: 'theater', title: '《剧场女神》（首演无卡）', url: 'https://www.bilibili.com/video/BV1Ks411k7B7/', tag: '公演', date: '2014' },
  { category: 'theater', title: '《逆流而上》公演合辑', url: 'https://www.bilibili.com/video/BV1os411U7qc/', tag: '公演', date: '2014.08-10' },
  { category: 'theater', title: '《前所未有》公演合辑', url: 'https://www.bilibili.com/video/BV1Zs411U7sh/', tag: '公演', date: '2014.10-2015.04' },
  { category: 'theater', title: '《我的太阳》公演合辑', url: 'https://www.bilibili.com/video/BV1us411S7xe/', tag: '公演', date: '2015' },
  { category: 'theater', title: '《我的太阳》卡黄Cut', url: 'https://www.bilibili.com/video/BV1vs411z7Ph/', tag: 'Cut', date: '2015-2016' },
  { category: 'theater', title: '《十八个闪耀瞬间》公演合辑', url: 'https://www.bilibili.com/video/BV1ks411q7wX/', tag: '公演', date: '2016.01-07' },
  { category: 'theater', title: '《十八个闪耀瞬间》卡黄Cut', url: 'https://www.bilibili.com/video/BV1Bs411q73d/', tag: 'Cut', date: '2016.01-07' },
  { category: 'theater', title: '《专属派对》公演合辑', url: 'https://www.bilibili.com/video/BV1ys411y7hv/', tag: '公演', date: '2016-2017' },
  { category: 'theater', title: '《以爱之名》公演全记录', url: 'https://www.bilibili.com/video/BV14x411u7k3/', tag: '公演', date: '2017-2018' },
  { category: 'theater', title: '《忆往昔》特别公演', url: 'https://www.bilibili.com/video/BV1BW411x7Tj/', tag: '特别公演', date: '2018.03.04' },
  { category: 'interview', title: '三选御三家专访', url: 'https://www.bilibili.com/video/BV1Ws411C7h8/', tag: '专访', date: '2016' },
  { category: 'interview', title: '四选媒体群访完整版', url: 'https://www.bilibili.com/video/BV1Fx411p7Yf/', tag: '采访', date: '2017.08.04' },
  { category: 'interview', title: '五选御三家赛后专访', url: 'https://www.bilibili.com/video/BV1Xs411c7od/', tag: '专访', date: '2018.07.28' },
  { category: 'interview', title: '六选发卡第一名发表-婷婷Focus', url: 'https://www.bilibili.com/video/BV1Ut411P7kF/', tag: 'Focus', date: '2019.07.27' },
  { category: 'interview', title: 'SNH48年度金曲大赏 乐视音乐专访卡黄篇', url: 'https://www.bilibili.com/video/BV1Ms411R7AJ/', tag: 'Focus', date: '2016.01.06' },
  { category: 'stage', title: '《那不勒斯的黎明》五选版', url: 'https://www.bilibili.com/video/BV1Ta411v777/', tag: '舞台', date: '2018' },
  { category: 'stage', title: '《那不勒斯的黎明》风尚大赏', url: 'https://www.bilibili.com/video/BV19x411L7qX/', tag: '舞台', date: '2018' },
  { category: 'stage', title: '《源动力》官方MV+现场', url: 'https://www.bilibili.com/video/BV1Ms411z7AA/', tag: 'MV/现场', date: '2016' },
  { category: 'extra', title: '小四电台采访tts，发卡陪伴', url: 'https://www.bilibili.com/video/BV1PV7SzzExE/', tag: '电台', date: '2014.07.01' },
  { category: 'extra', title: '第二届年度风尚大赏 卡黄cut', url: 'https://www.bilibili.com/video/BV1ps411x7co/', tag: '风尚', date: '2016.11.05' }
]

function tagClass(tag: string) {
  const t = tag.replace(/\s/g, '').toLowerCase()
  if (t.includes('官摄')) return 'bg-fuchsia-500/20 text-fuchsia-200'
  if (t.includes('mv')) return 'bg-purple-500/20 text-purple-200'
  if (t.includes('花絮')) return 'bg-amber-500/20 text-amber-200'
  if (t.includes('舞台')) return 'bg-indigo-500/20 text-indigo-200'
  if (t.includes('公演')) return 'bg-emerald-500/20 text-emerald-200'
  if (t.includes('cut')) return 'bg-rose-500/20 text-rose-200'
  if (t.includes('4k')) return 'bg-sky-500/20 text-sky-200'
  if (t.includes('消音')) return 'bg-cyan-500/20 text-cyan-200'
  if (t.includes('专访') || t.includes('采访')) return 'bg-pink-500/20 text-pink-200'
  if (t.includes('电台')) return 'bg-fuchsia-500/20 text-fuchsia-200'
  if (t.includes('风尚')) return 'bg-yellow-500/20 text-yellow-200'
  return 'bg-white/10 text-white/80'
}

export default function MaterialGallery() {
  const [active, setActive] = useState<string>('stage')
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = useMemo(() => {
    const kw = searchTerm.trim().toLowerCase()
    return MATERIALS.filter(m => m.category === active)
      .filter(m => {
        if (!kw) return true
        const hay = (m.title + ' ' + m.tag + ' ' + m.date).toLowerCase()
        return hay.includes(kw)
      })
  }, [active, searchTerm])

  const countsByCategory = useMemo(() => {
    const kw = searchTerm.trim().toLowerCase()
    const res: Record<string, number> = {}
    for (const c of MATERIAL_CATEGORIES) {
      res[c.id] = MATERIALS.filter(m => m.category === c.id).filter(m => {
        if (!kw) return true
        const hay = (m.title + ' ' + m.tag + ' ' + m.date).toLowerCase()
        return hay.includes(kw)
      }).length
    }
    return res
  }, [searchTerm])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {MATERIAL_CATEGORIES.map(c => {
          const selected = c.id === active
          const countSuffix = searchTerm ? ` [${countsByCategory[c.id] ?? 0}]` : ''
          return (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`px-3 py-1.5 rounded-full text-xs md:text-sm transition-all
                ${selected ? 'bg-fuchsia-500/20 text-fuchsia-200 shadow-[0_0_20px_rgba(217,70,239,0.25)] border border-fuchsia-400/30' : 'text-white/80 border border-white/10 hover:border-white/20 bg-white/5'}`}
            >
              <span className="mr-1">{c.icon}</span>
              {c.name}{countSuffix}
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-center">
        <div className="relative w-full max-w-xl">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
          <input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="搜索标题 / 标签 / 日期"
            className="w-full pl-9 pr-10 py-2 rounded-full bg-white/5 border border-white/10 text-white placeholder-white/50
            focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10"
              aria-label="clear"
            >
              <X size={16} className="text-white/70" />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="text-center text-white/70 py-10"
          >
            未找到相关物料，换个词试试？
          </motion.div>
        ) : (
          <motion.div
            key={active + searchTerm}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {filtered.map((m, idx) => (
              <motion.a
                key={m.title + idx}
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.02 }}
                whileHover={{ y: -3 }}
                className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-3
                  hover:shadow-[0_0_20px_rgba(192,38,211,0.2)] hover:border-fuchsia-400/40"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2 py-0.5 text-[10px] rounded ${tagClass(m.tag)}`}>{m.tag}</span>
                  <span className="text-[10px] text-white/60">{m.date}</span>
                </div>
                <div
                  className="mt-2 text-sm text-white/90 min-h-[2.5em]"
                  style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  title={m.title}
                >
                  {m.title}
                </div>
                <ExternalLink size={16} className="absolute right-2 bottom-2 text-white/60" />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
