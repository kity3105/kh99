export type LinkItem = {
  title: string
  description: string
  url: string
}

export type Group = {
  name: string
  items: LinkItem[]
}

export const ZHI_TING_TING_SANG = `致我最最亲爱的婷婷桑：

在这个普天同庆锣鼓喧天鞭炮齐鸣的日子里，我们迎来了婷婷桑的第一届生诞祭，所以在这里我想好好的跟大家分享一下我眼中的婷婷桑。

什么时候我是开始注意到婷婷桑的呢？我想想算一算大概是半年前的时候，我开始关注到这个如此美好的存在。如果说n队的每个成员都能比作一种花朵的话，婷婷桑就像是一株生长在墙角的兰花，初见时并不惊艳，只是静静的绽放，吐露出丝丝缕缕的幽香。

这么说大概是有些文艺了吧，但是婷婷桑的身上真的是有一种不同于他人的温和又淳朴的气质，在所有的队友里，婷婷桑能与每个人都相处的非常好。

而我非常喜欢这样的温柔的人，所以，对这样温柔的婷婷桑我有些心动了。从一开始只是偶尔去找她玩，只是礼貌性的跟她寒暄，到后来没事就待在她房间里面赖着不走，拿着婷婷桑的海苔啃，偶尔换来她的一脸嫌弃。但是却为能够这样肆意的和她相处，心里而有些窃喜。

在这样的每日的相处中，渐渐的就发现她另外的很多面。看似又呆又淳朴的表面之下，其实偶尔是会被盐一脸的。相处了熟的话，就会发现其实她是傲娇本性，有时候嘴上不说，只是默默做着自己应该做的事情，但是她心里也会有小小的别扭，小小的不甘心，但是她也不会说出来。越是靠近她，就越是想更多的了解她。

直到现在，已经不可自拔了，深深的喜欢上了她。

无论是一心坚定的认为自己是时尚达人的她，（灵魂歌姬什么都是浮云)一心努力的为大家歌唱的她，看似柔弱实际上坚韧不拔的她，全部都最喜欢了！今后也想更多的了解她，走近她。

因为，笑顏が一番，婷婷桑的笑颜在我心里是第一位。

谢谢大家。`

export const GROUPS: Group[] = [
  {
    name: '豆瓣',
    items: [
      { title: '时间线超级全记录', description: '（比较详细）', url: 'https://www.douban.com/doubanapp/dispatch?uri=%2Fgroup%2Ftopic%2F341169003' },
      { title: '时间线', description: '（文字为主，和上面那个互补着看）', url: 'https://www.douban.com/doubanapp/dispatch?uri=%2Fgroup%2Ftopic%2F336400854' },
      { title: '谁说黄婷婷没爱过...卡黄be篇...', description: '（黄婷婷爱过的证据1）', url: 'https://www.douban.com/doubanapp/dispatch?uri=%2Fgroup%2Ftopic%2F314200804' },
      { title: '卡黄最大的骗局...是不是所有人都以为黄婷婷不爱...', description: '（黄婷婷爱过的证据2）', url: 'https://www.douban.com/doubanapp/dispatch?uri=%2Fgroup%2Ftopic%2F314173533' },
    ]
  },
  {
    name: 'B站',
    items: [
      { title: '「卡黄」「回顾向」当我们一起走过', description: '', url: 'https://b23.tv/rEVVOnz' },
      { title: '「卡黄」来日方长（2018年同框汇总 // 更新至8月1日）', description: '', url: 'https://b23.tv/ALye9zP' },
      { title: '「卡黄」如果以黄婷婷的视角打开卡黄', description: '', url: 'https://b23.tv/suM6gmr' },
      { title: '「卡黄」如果以李艺彤的视角打开卡黄', description: '', url: 'https://b23.tv/CqtglXD' },
      { title: '谁说黄婷婷没爱过...卡黄BE篇...', description: '（把豆瓣的同名帖做成了视频，黄婷婷爱过的证据1）', url: 'https://b23.tv/Zp7oWOu' },
      { title: '卡黄最大的骗局...是不是所有人都以为黄婷婷不爱...', description: '（把豆瓣的同名帖做成了视频，黄婷婷爱过的证据2）', url: 'https://b23.tv/1rW2akD' },
      { title: '「卡黄」合音合唱版-爱的加速器', description: '', url: 'https://www.bilibili.com/video/BV1js411y7vo' },
      { title: '「卡黄」合声合集', description: '（内含《降落伞》《Mad World》等合音）', url: 'https://www.bilibili.com/video/BV1Bb411q7Nr' },
      { title: '「卡黄」春日卡黄双音轨合唱', description: '', url: 'https://www.bilibili.com/video/BV1g7411F7Xy' },
      { title: '「卡黄」爱恨的泪（绝版合集）', description: '（含14版和17版的双轨合唱）', url: 'https://www.bilibili.com/video/BV1Ns411h7by' },
      { title: '「卡黄同人文」《喜宴》有声书', description: '（lofter著名同人文的有声书）', url: 'https://www.bilibili.com/video/BV1EK4y177XW' },
    ]
  },
  {
    name: 'lofter',
    items: [
      { title: '当htt看到卡黄的热搜以后', description: '（短篇，“怪罪一个陌生人，是很没道理的事情”出处）', url: 'https://xilanhua120.lofter.com/post/1fdfe417_2be58f6f7' },
      { title: '喜宴', description: '（短篇，“伴娘在她身后站成一列。”）', url: 'https://elveda-bear.lofter.com/post/1ba3f8_1ca50a9b5' },
      { title: '九号房间', description: '（长篇已完结，经典设定，这个作者写的很好吃）', url: 'https://www.lofter.com/front/blog/collection/share?collectionId=29328741' },
      { title: 'Exchange', description: '（长篇已完结，卡黄卡特双时间线）', url: 'https://www.lofter.com/front/blog/collection/share?collectionId=126143' },
      { title: '卡黄/换乘恋爱', description: '（长篇已完结，代入经典ip非常赞）', url: 'https://www.lofter.com/front/blog/collection/share?collectionId=29298992' },
      { title: '错位眼泪', description: '（长篇未完结，前半部分幼卡穿越到现婷身边设定）', url: 'https://www.lofter.com/front/blog/collection/share?collectionId=23592067' },
    ]
  },
  {
    name: '微博',
    items: [
      { title: '厕所', description: '（每日1:30左右开始打扫，评论评鉴十分惬意）', url: 'https://weibo.com/u/7868433054' },
      { title: 'SNH48-不可说应援会', description: '（老资历khg的主页，考古必去）', url: 'https://weibo.com/u/2409549723' },
      { title: '卡黄&卡&黄照片整理', description: '（很厉害的整理博主）', url: 'https://weibo.com/7889708705/5285559049131086' },
      { title: '卡黄合照整理', description: '（同上，照片存底）', url: 'https://weibo.com/7889708705/5285559049131086' },
    ]
  },
  {
    name: '抖音',
    items: [
      { title: 'pop卡和pipi婷', description: '（小动画，老师很神，超级无敌可爱好吃）', url: 'https://v.douyin.com/bwSlhFgIgIo' },
      { title: '意外加到的主播竟是我的激推梦女', description: '（未完结，很萌很可爱）', url: 'https://v.douyin.com/wyikp-gAfLc' },
    ]
  }
]
