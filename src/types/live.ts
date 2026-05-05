export interface LiveItem {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  coverUrl: string;
  thumbnailUrl: string;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'live' | 'ended';
  streamUrl: string;
  priceCoin: number;
  isPurchased: boolean;
  category: string;
  venue: string;
  matchCount: number;
  watch_token?: string;
}

export interface PurchaseLivePayload {
  liveId: string;
}

export interface ReportProblemPayload {
  liveId: string;
  problemType: string;
  description: string;
}

export interface SendTipPayload {
  liveId: string;
  fighterId?: string;
  amount: number;
  message?: string;
}
