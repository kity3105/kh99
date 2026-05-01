import { motion } from 'framer-motion'

const instructions = [
  '不要贴脸ky',
  '带卡黄标签记得屏蔽两位大人，同时不要带单人tag',
  '磕卡黄最好的时间是十年前，其次是现在',
  '不要听信单推老师的wpg言论，两位都是很好的人',
  '我们cp粉在be前被称为皮卡丘，现已恢复人籍',
  '没磕卡黄说明不了解，磕到卡黄算你倒霉',
  '圈地自萌就好，爱是礼貌和不打扰',
  '烟花梗和蟑螂说的是集资的人，仅供自嘲，切勿真情代入'
]

const tutorials = [
  { title: '时间线', content: '收录能找到的所有事件，点击文字查看具体内容。支持左右视角切换。' },
  { title: '物料', content: '1.一些考古物料，卡黄为主，元恩为辅 2.请擅用搜索功能 3.持续更新中……' },
  { title: '必吃榜', content: '精选二创，请细细品味。' },
]

export default function Instructions() {
  return (
    <div className="pb-12">
      {/* --- 1. Header 背景区域 --- */}
      <div className="relative h-[60vh] sm:h-[50vh] w-full overflow-hidden z-0">
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: "url('/photo/instruction%20background.JPG')",
          }}
        />
        {/* 自然过渡渐变层: 从透明消融到背景色 */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-b from-transparent to-[#050510]" />
      </div>

      {/* --- 2. 内容区域 --- */}
      <div className="relative z-10 -mt-20 px-4">
        <div className="space-y-8 max-w-2xl mx-auto">
          {/* --- 入坑须知方块 --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-card p-6 border border-purple-500/20 shadow-[0_0_30px_rgba(192,38,211,0.15)]"
          >
            <h2 className="text-xl font-bold text-purple-300 mb-6 text-center tracking-widest">入坑须知</h2>
            <ol className="list-decimal list-inside space-y-4 text-sm text-white/80 font-serif leading-relaxed">
              {instructions.map((item, index) => (
                <li key={index} className="pl-2">{item}</li>
              ))}
            </ol>
          </motion.div>

          {/* --- 本网站使用介绍 --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
          >
            <h2 className="text-xl font-bold text-purple-300 mb-6 text-center">本网站使用介绍</h2>
            <div className="grid grid-cols-1 gap-4">
              {tutorials.map((item, index) => (
                <div key={index} className="backdrop-blur-card p-5">
                  <h3 className="font-semibold text-fuchsia-300 mb-2">{item.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
