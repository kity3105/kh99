
export type FocusMode = 'left' | 'both' | 'right';

export interface TimelineEvent {
  date: string;
  type: 'split' | 'center';
  leftContent?: string;
  rightContent?: string;
  leftIsHighlight?: boolean;
  rightIsHighlight?: boolean;
  centerContent?: string;
  detailText?: string;
  images?: string[];
}

export interface YearData {
  year: string;
  summary: string;
  events: TimelineEvent[];
}
