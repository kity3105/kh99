import { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ArrowLeft } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

type Work = { cat: string; title: string; url: string; tag: string }
type Social = { platform: string; url: string }

const LYT_DATA = {
  info: {
    name: '李艺彤',
    nickname: '发卡',
    birthday: '1995.12.23',
    zodiac: '摩羯座',
    height: '167.5cm',
    mbti: 'ENTJ',
    fans: '卡推',
    color: '#a81e32',
    colorName: '破晓红'
  },
  social: [
    { platform: '微博', url: 'https://weibo.com/u/3700233717' },
    { platform: 'B站', url: 'https://space.bilibili.com/49922172' },
    { platform: 'INS', url: 'https://www.instagram.com/whitehairpin/' }
  ] as Social[],
  works: [
    { cat: 'stage', title: '《Idol》 (超级推荐)', url: 'http://t.cn/A6B1XkpN', tag: '精选' },
    { cat: 'stage', title: '《人间规则》 (直拍)', url: 'http://t.cn/A6B1XkWz', tag: '直拍' },
    { cat: 'stage', title: '《无罪无我》 (直拍)', url: 'http://t.cn/AijjrbAd', tag: '直拍' },
    { cat: 'stage', title: '毕业公演《你好！李艺彤！》', url: 'http://t.cn/A6B1XkW2', tag: '里程碑' },
    { cat: 'stage', title: '《关不掉》 舞台', url: 'http://t.cn/A6B1XkWP', tag: '舞台' },
    { cat: 'stage', title: '《天真》 舞台', url: 'http://t.cn/A6B1XkWA', tag: '舞台' },
    { cat: 'stage', title: '《钢铁之翼》 舞台', url: 'http://t.cn/ReiXk05', tag: '舞台' },
    { cat: 'stage', title: '《钢铁之翼》 直拍1', url: 'http://t.cn/Reij0rZ', tag: '直拍' },
    { cat: 'stage', title: '《钢铁之翼》 直拍2', url: 'http://t.cn/A67woBF7', tag: '直拍' },
    { cat: 'stage', title: '《钢铁之翼》 直拍3', url: 'http://t.cn/ReCLixp', tag: '直拍' },
    { cat: 'stage', title: '《加速》 舞台', url: 'http://t.cn/A603Kof6', tag: '舞台' },
    { cat: 'stage', title: '《加速》 直拍', url: 'http://t.cn/A603KofX', tag: '直拍' },
    { cat: 'stage', title: '《就差一点点》', url: 'http://t.cn/EI9G1BP', tag: '舞台' },
    { cat: 'stage', title: '《Re:birth》见面会', url: 'http://t.cn/A6B1XkWv', tag: '舞台' },
    { cat: 'stage', title: "《Merci de m'aimer》生日会", url: 'http://t.cn/A62BBh53', tag: '舞台' },
    { cat: 'interview', title: '《送一百位女孩回家》', url: 'http://t.cn/A6B1XkWh', tag: '深度' },
    { cat: 'interview', title: '《失意者联盟》 (纪录片)', url: 'http://t.cn/A66fy2g6', tag: '必看' },
    { cat: 'interview', title: '毕业公演幕后记录', url: 'http://t.cn/A6B1XkW4', tag: '纪录' },
    { cat: 'fanmade', title: '《昨日青空》 (成长向)', url: 'http://t.cn/A6B1XkOF', tag: '催泪' },
    { cat: 'fanmade', title: '《偶像的真面目》', url: 'http://t.cn/A62gp1X7', tag: '安利' },
    { cat: 'fanmade', title: '十八个温柔瞬间', url: 'http://t.cn/A6B1XkOk', tag: '剪辑' },
    { cat: 'archive', title: '卡利坚王国 (B站补档)', url: 'http://t.cn/A6B1XkpC', tag: '补档' },
    { cat: 'archive', title: 'PaleBlue 资源博', url: 'http://t.cn/A6B1XkpO', tag: '补档' }
  ] as Work[]
}

const HTT_DATA = {
  info: {
    name: '黄婷婷',
    nickname: '踢踢/Kotete',
    birthday: '1992.09.08',
    zodiac: '处女座',
    height: '165cm',
    mbti: 'INFP',
    fans: '跳跳糖',
    color: '#FFD306',
    colorName: '踢踢黄'
  },
  social: [
    { platform: '微博', url: 'https://weibo.com/u/3675865547' },
    { platform: 'B站', url: 'https://space.bilibili.com/2479604' },
    { platform: 'INS', url: 'https://www.instagram.com/kotetehtt/' }
  ] as Social[],
  works: [
    { cat: 'stage', title: '《失恋阵线联盟》 (甜度满分)', url: 'http://t.cn/AXbQYtPH', tag: '精选' },
    { cat: 'stage', title: '《公主披风》 (帅气Focus)', url: 'http://t.cn/AXbQYtPY', tag: '舞台' },
    { cat: 'stage', title: '《Show》 (钢琴名场面)', url: 'http://t.cn/AXbQYtPm', tag: '惊艳' },
    { cat: 'stage', title: '《光之轨迹》 挥旗版', url: 'http://t.cn/AXbQFK1N', tag: '舞台' },
    { cat: 'stage', title: '《光之轨迹》 舞台', url: 'http://t.cn/AXbQFK19', tag: '舞台' },
    { cat: 'interview', title: '理娱独家对话', url: 'http://t.cn/RrsDRtm', tag: '访谈' },
    { cat: 'interview', title: '凤凰网《百人计划》', url: 'http://t.cn/A6F8Mhdx', tag: '深度' },
    { cat: 'interview', title: '演讲《十三亿分之你》', url: 'http://t.cn/AXbQYtPp', tag: '演讲' },
    { cat: 'drama', title: '《即刻上场》', url: 'https://www.bilibili.com/video/BV15m421f7V7', tag: '剧集' },
    { cat: 'drama', title: '《飞驰人生热血篇》', url: 'https://www.bilibili.com/video/BV15Z421z7k7', tag: '剧集' },
    { cat: 'fanmade', title: '《黄婷婷洗猫》 (世界名画)', url: 'http://t.cn/AXbQFK10', tag: '必看' },
    { cat: 'fanmade', title: '《我的黑心偶像》', url: 'http://t.cn/AXbQFK1p', tag: '爆笑' }
  ] as Work[]
}

function chip(tag: string) {
  const t = tag.toLowerCase()
  if (t.includes('精选')) return 'bg-fuchsia-500/20 text-fuchsia-200'
  if (t.includes('直拍')) return 'bg-rose-500/20 text-rose-200'
  if (t.includes('里程碑')) return 'bg-amber-500/20 text-amber-200'
  if (t.includes('深度') || t.includes('必看')) return 'bg-purple-500/20 text-purple-200'
  if (t.includes('安利')) return 'bg-emerald-500/20 text-emerald-200'
  if (t.includes('资源') || t.includes('补档')) return 'bg-sky-500/20 text-sky-200'
  if (t.includes('剧集')) return 'bg-yellow-400/20 text-yellow-200'
  if (t.includes('演讲')) return 'bg-pink-500/20 text-pink-200'
  if (t.includes('惊艳')) return 'bg-indigo-500/20 text-indigo-200'
  if (t.includes('舞台')) return 'bg-blue-500/20 text-blue-200'
  if (t.includes('必看')) return 'bg-orange-500/20 text-orange-200'
  if (t.includes('爆笑')) return 'bg-lime-500/20 text-lime-200'
  return 'bg-white/10 text-white/80'
}

function LYTWall({ works }: { works: Work[] }) {
  const [active, setActive] = useState<'stage' | 'interview' | 'fanmade' | 'archive'>('stage')
  const filtered = useMemo(() => works.filter(w => w.cat === active), [works, active])
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {[
          { id: 'stage', name: '舞台' },
          { id: 'interview', name: '访谈' },
          { id: 'fanmade', name: '饭制' },
          { id: 'archive', name: '补档' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id as any)}
            className={`px-3 py-1.5 rounded-full text-xs md:text-sm transition-all ${active === t.id ? 'bg-fuchsia-500/20 text-fuchsia-200 shadow-[0_0_20px_rgba(217,70,239,0.25)] border border-fuchsia-400/30' : 'text-white/80 border border-white/10 hover:border-white/20 bg-white/5'}`}
          >
            {t.name}
          </button>
        ))}
      </div>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          {filtered.map((w, i) => (
            <motion.a
              key={w.title + i}
              href={w.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.02 }}
              whileHover={{ y: -3 }}
              className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-3 hover:shadow-[0_0_20px_rgba(192,38,211,0.2)] hover:border-fuchsia-400/40"
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`px-2 py-0.5 text-[10px] rounded ${chip(w.tag)}`}>{w.tag}</span>
                <ExternalLink size={16} className="text-white/60" />
              </div>
              <div className="mt-2 text-sm text-white/90 min-h-[2.5em]" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} title={w.title}>
                {w.title}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function HTTWall({ works }: { works: Work[] }) {
  const [active, setActive] = useState<'stage' | 'drama' | 'interview' | 'fanmade'>('stage')
  const filtered = useMemo(() => works.filter(w => w.cat === active), [works, active])
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {[
          { id: 'stage', name: '舞台' },
          { id: 'drama', name: '影视' },
          { id: 'interview', name: '访谈' },
          { id: 'fanmade', name: '饭制' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id as any)}
            className={`px-3 py-1.5 rounded-full text-xs md:text-sm transition-all ${active === t.id ? 'bg-yellow-300/20 text-yellow-200 shadow-[0_0_20px_rgba(255,211,6,0.25)] border border-yellow-300/30' : 'text-white/80 border border-white/10 hover:border-white/20 bg-white/5'}`}
          >
            {t.name}
          </button>
        ))}
      </div>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          {filtered.map((w, i) => (
            <motion.a
              key={w.title + i}
              href={w.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.02 }}
              whileHover={{ y: -3 }}
              className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-3 hover:shadow-[0_0_20px_rgba(255,211,6,0.25)] hover:border-yellow-300/40"
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`px-2 py-0.5 text-[10px] rounded ${chip(w.tag)}`}>{w.tag}</span>
                <ExternalLink size={16} className="text-white/60" />
              </div>
              <div className="mt-2 text-sm text-white/90 min-h-[2.5em]" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} title={w.title}>
                {w.title}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function Profiles() {
  const [searchParams] = useSearchParams()
  const initialView = searchParams.get('v') as 'lyt' | 'htt' | null
  const [view, setView] = useState<'cards' | 'lyt' | 'htt'>(initialView || 'cards')

  useEffect(() => {
    if (initialView && (initialView === 'lyt' || initialView === 'htt')) {
      setView(initialView)
    }
  }, [initialView])

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {view === 'cards' && (
          <motion.div
            key="cards"
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <button
              onClick={() => setView('htt')}
              className="relative rounded-2xl p-4 border border-white/10 bg-white/5 backdrop-blur-md text-left overflow-hidden"
            >
              <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 60% at 80% 20%, rgba(255,211,6,0.18), transparent 60%)' }} />
              <div className="relative z-10">
                <div className="text-xl font-bold text-white/90">黄婷婷</div>
                <div className="text-xs text-white/70 mt-0.5">INFP · 165cm · 踢踢黄</div>
                <div className="mt-3 inline-flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full text-xs border border-yellow-300/40 text-yellow-200">作品墙</div>
                </div>
              </div>
            </button>
            <button
              onClick={() => setView('lyt')}
              className="relative rounded-2xl p-4 border border-white/10 bg-white/5 backdrop-blur-md text-left overflow-hidden"
            >
              <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 60% at 20% 30%, rgba(168,30,50,0.25), transparent 60%)' }} />
              <div className="relative z-10">
                <div className="text-xl font-bold text-white/90">李艺彤</div>
                <div className="text-xs text-white/70 mt-0.5">ENTJ · 167.5cm · 破晓红</div>
                <div className="mt-3 inline-flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full text-xs border border-fuchsia-400/40 text-fuchsia-200">作品墙</div>
                </div>
              </div>
            </button>
          </motion.div>
        )}
        {view !== 'cards' && (
          <motion.div
            key="wall"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <button
              onClick={() => setView('cards')}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white"
            >
              <ArrowLeft size={16} />
              返回
            </button>
            {view === 'htt' ? <HTTWall works={HTT_DATA.works} /> : <LYTWall works={LYT_DATA.works} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
