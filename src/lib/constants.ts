export const ROUTES = {
  HOME: '',
  LIVE: '/live',
  LIVE_DETAIL: (id: string) => `/live/${id}`,
  PROGRAMS: '/programs',
  HIGHLIGHTS: '/highlights',
  REPLAYS: '/replays',
  NEWS: '/news',
  NEWS_DETAIL: (id: string) => `/news/${id}`,
  FIGHTERS: '/fighters',
  FIGHTER_DETAIL: (id: string) => `/fighters/${id}`,
  RANKING: '/ranking',
  RESULTS: '/results',
  PREDICTION: '/prediction',
  ACCOUNT: '/account',
  ACCOUNT_COIN: '/account/coin',
  ACCOUNT_COIN_HISTORY: '/account/coin-history',
  ACCOUNT_PROFILE: '/account/profile',
  ACCOUNT_REDEEM: '/account/redeem',
  ACCOUNT_TV_QR: '/account/tv-qr',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  POLICY: '/policy',
  TERMS: '/terms',
  CONTACT: '/contact',
} as const;

export const NAV_ITEMS = [
  { labelTh: 'หน้าหลัก', labelEn: 'Home', href: ROUTES.HOME },
  { labelTh: 'ดูไลฟ์สด', labelEn: 'Live', href: ROUTES.LIVE },
  { labelTh: 'โปรแกรมกีฬา', labelEn: 'Programs', href: ROUTES.PROGRAMS },
  { labelTh: 'ทายผลแข่งขัน', labelEn: 'Prediction', href: ROUTES.PREDICTION },
  { labelTh: 'ประวัตินักกีฬา', labelEn: 'Fighters', href: ROUTES.FIGHTERS },
  { labelTh: 'อันดับนักกีฬา', labelEn: 'Ranking', href: ROUTES.RANKING },
] as const;

export const CATEGORIES = [
  { value: 'all', labelTh: 'ทั้งหมด', labelEn: 'All' },
  { value: 'muaythai', labelTh: 'มวยไทย', labelEn: 'Muay Thai' },
  { value: 'boxing', labelTh: 'มวยสากล', labelEn: 'Boxing' },
  { value: 'mma', labelTh: 'MMA', labelEn: 'MMA' },
  { value: 'kickboxing', labelTh: 'คิกบ็อกซิ่ง', labelEn: 'Kickboxing' },
] as const;

export const WEIGHT_CLASSES = [
  'Mini Flyweight',
  'Light Flyweight',
  'Flyweight',
  'Super Flyweight',
  'Bantamweight',
  'Super Bantamweight',
  'Featherweight',
  'Super Featherweight',
  'Lightweight',
  'Super Lightweight',
  'Welterweight',
  'Super Welterweight',
  'Middleweight',
  'Super Middleweight',
  'Light Heavyweight',
  'Cruiserweight',
  'Heavyweight',
] as const;

export const COLORS = {
  gold: '#C9A227',
  goldLight: '#E8C547',
  goldDark: '#A8871E',
  black: '#0E0E0E',
  dark: '#171717',
  darkGray: '#1E1E1E',
  white: '#FFFFFF',
  grayBg: '#F6F6F6',
  red: '#E53E3E',
  green: '#38A169',
} as const;

export const DEFAULT_LOCALE = 'th' as const;
export const SUPPORTED_LOCALES = ['th', 'en'] as const;

export const STORAGE_KEYS = {
  TOKEN: 'pryde_token',
  REFRESH_TOKEN: 'pryde_refresh_token',
  USER: 'pryde_user',
  LANGUAGE: 'pryde_language',
} as const;

import type { CoinPackage } from '@/types/account';

export const COIN_PACKAGES: CoinPackage[] = [
  { id: 'pkg_1', amount: 50, price: 50, bonus: 0, currency: 'THB' },
  { id: 'pkg_2', amount: 100, price: 100, bonus: 10, currency: 'THB' },
  { id: 'pkg_3', amount: 300, price: 300, bonus: 50, currency: 'THB', popular: true },
  { id: 'pkg_4', amount: 500, price: 500, bonus: 100, currency: 'THB' },
  { id: 'pkg_5', amount: 1000, price: 1000, bonus: 250, currency: 'THB' },
];
