export type ContentType = 'live' | 'highlight' | 'replay' | 'news' | 'program' | 'result';

export interface ContentItem {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  thumbnailUrl: string;
  category: string;
  type: ContentType;
  dateTime: string;
  isLive: boolean;
  coinPrice: number;
  slug: string;
  venue?: string;
  duration?: string;
}

export interface NewsItem extends ContentItem {
  content: string;
  contentEn?: string;
  author: string;
  tags: string[];
}

export interface ProgramItem extends ContentItem {
  matchups: MatchupItem[];
  status: 'upcoming' | 'live' | 'ended';
}

export interface MatchupItem {
  id: string;
  redCorner: string;
  blueCorner: string;
  weightClass: string;
  round: number;
  status: 'upcoming' | 'live' | 'ended';
  result?: string;
}

export interface ResultItem extends ContentItem {
  matchups: MatchupItem[];
  winner?: string;
}

export interface Fighter {
  id: string;
  name: string;
  nameEn?: string;
  nickname?: string;
  nicknameEn?: string;
  avatarUrl: string;
  coverUrl: string;
  weightClass: string;
  country: string;
  gym?: string;
  wins: number;
  losses: number;
  draws: number;
  ko: number;
  ranking: number;
  rank?: string;
  bio?: string;
  bioEn?: string;
  height?: string;
  weight?: string;
  age?: number;
}

export interface RankingItem {
  rank: number;
  fighter: Fighter;
  weightClass: string;
  points: number;
  change: 'up' | 'down' | 'same';
  changeAmount: number;
}

export interface HomeData {
  heroHighlights: ContentItem[];
  livePrograms: ContentItem[];
  highlights: ContentItem[];
  replays: ContentItem[];
  results: ResultItem[];
  news: NewsItem[];
  fighters: Fighter[];
}
