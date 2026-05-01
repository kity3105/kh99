export type TimelineEvent = {
  id: string
  date: string // YYYY-MM-DD 格式
  title: string
  content: string
  tags: string[]
  imageCount: number
}

export type YearEvents = {
  year: number
  events: TimelineEvent[]
}
