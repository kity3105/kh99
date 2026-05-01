const timelineImageModules = import.meta.glob('/public/timeline/**/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>

const timelineImageEntries = Object.entries(timelineImageModules).map(([fullPath, assetUrl]) => ({
  fullPath,
  assetUrl
}))

/**
 * 根据日期自动查找该事件对应的图片路径数组
 * @param date - YYYY-MM-DD 格式的日期字符串
 * @param imageCount - 可选的图片数量限制；未填写时自动返回当天全部匹配图片
 * @returns 图片路径数组，来自 public/timeline/YYYY/YYYYMMDD_nn.ext
 */
export function getEventImages(date: string, imageCount = 0): string[] {
  const [year, month, day] = date.split('-')
  const datePrefix = `${year}${month}${day}`
  const matcher = new RegExp(`/timeline/${year}/${datePrefix}_(\\d+)\\.[^/]+$`, 'i')

  const images = timelineImageEntries
    .map((entry) => {
      const normalizedPath = entry.fullPath.replace('/public', '')
      const match = normalizedPath.match(matcher)
      if (!match) return null

      return {
        url: entry.assetUrl,
        order: parseInt(match[1], 10)
      }
    })
    .filter((item): item is { url: string; order: number } => item !== null)
    .sort((a, b) => a.order - b.order)
    .map((item) => item.url)

  return imageCount > 0 ? images.slice(0, imageCount) : images
}

/**
 * 从日期字符串中提取年份
 * @param date - YYYY-MM-DD 格式的日期字符串
 * @returns 年份数字
 */
export function getYearFromDate(date: string): number {
  return parseInt(date.split('-')[0], 10)
}
