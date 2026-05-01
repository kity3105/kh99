/**
 * 时间线系统使用指南
 * 
 * 1. 在对应年份的文件中添加事件（如 src/data/timeline/2015.ts）
 * 2. 每个事件使用 TimelineEvent 类型
 * 3. 图片会自动根据日期和 imageCount 生成路径
 * 
 * 示例：
 * 
 * const events2015: YearEvents = {
 *   year: 2015,
 *   events: [
 *     {
 *       id: '2015-01-01-event1',
 *       date: '2015-01-01',
 *       title: '事件标题',
 *       content: '事件详细内容...',
 *       tags: ['标签1', '标签2'],
 *       imageCount: 3 // 会自动生成 20150101_1.jpg, 20150101_2.jpg, 20150101_3.jpg
 *     }
 *   ]
 * }
 */
