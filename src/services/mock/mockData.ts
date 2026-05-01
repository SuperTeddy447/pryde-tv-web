import type { ContentItem, NewsItem, Fighter, RankingItem, ResultItem } from '@/types/content';
import type { LiveItem } from '@/types/live';
import type { User } from '@/types/user';
import type { CoinTransaction } from '@/types/account';

// ─── Mock User ──────────────────────────────────────
export const mockUser: User = {
  id: 'user_001',
  name: 'สมชาย ใจดี',
  phone: '0891234567',
  email: 'somchai@email.com',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  coinBalance: 1250,
  prydePointBalance: 340,
  language: 'th',
};

// ─── Mock Live Programs ─────────────────────────────
export const mockLivePrograms: LiveItem[] = [
  {
    id: 'live_001', title: 'Pryde Championship Night', titleEn: 'Pryde Championship Night',
    description: 'ศึกมวยไทยชิงแชมป์ประจำสัปดาห์', descriptionEn: 'Weekly Muay Thai Championship',
    coverUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&h=300&fit=crop',
    startTime: new Date(Date.now() - 3600000).toISOString(),
    endTime: new Date(Date.now() + 7200000).toISOString(),
    status: 'live', streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    priceCoin: 99, isPurchased: false, category: 'muaythai', venue: 'ราชดำเนิน', matchCount: 8,
  },
  {
    id: 'live_002', title: 'Pryde Fight League #42', titleEn: 'Pryde Fight League #42',
    description: 'การแข่งขันมวยไทยลีกรอบ 42', descriptionEn: 'Muay Thai League Round 42',
    coverUrl: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=1200&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=400&h=300&fit=crop',
    startTime: new Date(Date.now() + 86400000).toISOString(),
    endTime: new Date(Date.now() + 86400000 + 10800000).toISOString(),
    status: 'upcoming', streamUrl: '', priceCoin: 79, isPurchased: false,
    category: 'muaythai', venue: 'ลุมพินี', matchCount: 10,
  },
  {
    id: 'live_003', title: 'Boxing Showdown Bangkok', titleEn: 'Boxing Showdown Bangkok',
    description: 'ศึกมวยสากลระดับนานาชาติ', descriptionEn: 'International Boxing Event',
    coverUrl: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?w=1200&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?w=400&h=300&fit=crop',
    startTime: new Date(Date.now() + 172800000).toISOString(),
    endTime: new Date(Date.now() + 172800000 + 10800000).toISOString(),
    status: 'upcoming', streamUrl: '', priceCoin: 149, isPurchased: false,
    category: 'boxing', venue: 'Impact Arena', matchCount: 6,
  },
  {
    id: 'live_004', title: 'MMA Warriors Night', titleEn: 'MMA Warriors Night',
    description: 'ศึก MMA สุดมันส์', descriptionEn: 'Ultimate MMA Event',
    coverUrl: 'https://images.unsplash.com/photo-1615117972428-28de67ac72d0?w=1200&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1615117972428-28de67ac72d0?w=400&h=300&fit=crop',
    startTime: new Date(Date.now() + 259200000).toISOString(),
    endTime: new Date(Date.now() + 259200000 + 10800000).toISOString(),
    status: 'upcoming', streamUrl: '', priceCoin: 129, isPurchased: false,
    category: 'mma', venue: 'Thunder Dome', matchCount: 7,
  },
  {
    id: 'live_005', title: 'Pryde Super Fight', titleEn: 'Pryde Super Fight',
    description: 'ซูเปอร์ไฟท์มวยไทย', descriptionEn: 'Super Fight Muay Thai',
    coverUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&h=300&fit=crop',
    startTime: new Date(Date.now() - 86400000).toISOString(),
    endTime: new Date(Date.now() - 82800000).toISOString(),
    status: 'ended', streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    priceCoin: 59, isPurchased: true, category: 'muaythai', venue: 'ราชดำเนิน', matchCount: 8,
  },
  {
    id: 'live_006', title: 'Kickboxing Grand Prix', titleEn: 'Kickboxing Grand Prix',
    description: 'ศึกคิกบ็อกซิ่งระดับโลก', descriptionEn: 'World Kickboxing Grand Prix',
    coverUrl: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=1200&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=400&h=300&fit=crop',
    startTime: new Date(Date.now() + 432000000).toISOString(),
    endTime: new Date(Date.now() + 432000000 + 10800000).toISOString(),
    status: 'upcoming', streamUrl: '', priceCoin: 199, isPurchased: false,
    category: 'kickboxing', venue: 'Rajadamnern Stadium', matchCount: 12,
  },
];

// ─── Mock Content Items ─────────────────────────────
export const mockHighlights: ContentItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: `hl_${i + 1}`, title: `ไฮไลท์มวยไทย ตอนที่ ${i + 1}`,
  titleEn: `Muay Thai Highlight Episode ${i + 1}`,
  description: `ไฮไลท์การแข่งขันสุดมันส์ ตอนที่ ${i + 1}`,
  descriptionEn: `Exciting fight highlights episode ${i + 1}`,
  thumbnailUrl: `https://images.unsplash.com/photo-${1549719386 + i * 1000}-74dfcbf7dbed?w=400&h=300&fit=crop`,
  category: 'muaythai', type: 'highlight' as const, dateTime: new Date(Date.now() - i * 86400000).toISOString(),
  isLive: false, coinPrice: 0, slug: `highlight-ep-${i + 1}`, duration: `${3 + i}:${20 + i * 5}`,
}));

export const mockReplays: ContentItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: `rep_${i + 1}`, title: `ย้อนหลัง ศึก Pryde Fight #${40 - i}`,
  titleEn: `Replay: Pryde Fight #${40 - i}`,
  description: `ดูย้อนหลังศึกมวยไทย Pryde Fight Night ครั้งที่ ${40 - i}`,
  descriptionEn: `Watch replay of Pryde Fight Night #${40 - i}`,
  thumbnailUrl: `https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?w=400&h=300&fit=crop`,
  category: 'muaythai', type: 'replay' as const, dateTime: new Date(Date.now() - (i + 1) * 604800000).toISOString(),
  isLive: false, coinPrice: i < 3 ? 29 : 0, slug: `pryde-fight-${40 - i}`, duration: '2:30:00',
}));

export const mockNews: NewsItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: `news_${i + 1}`,
  title: [
    'บัวขาว คัมแบ็ค! พร้อมสู้ศึกใหญ่ปลายปีนี้',
    'Pryde TV เปิดตัวระบบเติมเหรียญใหม่',
    'สรุปผลมวยไทยประจำสัปดาห์',
    'นักมวยดาวรุ่งที่น่าจับตามอง 2026',
    'เคล็ดลับการฝึกมวยไทยสำหรับมือใหม่',
    'ตารางการแข่งขันเดือนมิถุนายน',
    'บทสัมภาษณ์: แชมป์โลกมวยไทยคนล่าสุด',
    'อัปเดตกฎกติกาใหม่ของ WBC Muay Thai',
  ][i],
  titleEn: [
    'Buakaw Comeback! Ready for Big Fight This Year',
    'Pryde TV Launches New Coin System',
    'Weekly Muay Thai Results Summary',
    'Rising Stars to Watch in 2026',
    'Muay Thai Training Tips for Beginners',
    'June Competition Schedule',
    'Interview: Latest Muay Thai World Champion',
    'WBC Muay Thai New Rules Update',
  ][i],
  description: 'รายละเอียดข่าวกีฬามวยไทย',
  descriptionEn: 'Muay Thai sports news details',
  thumbnailUrl: `https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&h=300&fit=crop`,
  category: i % 2 === 0 ? 'muaythai' : 'boxing',
  type: 'news' as const,
  dateTime: new Date(Date.now() - i * 43200000).toISOString(),
  isLive: false, coinPrice: 0, slug: `news-${i + 1}`,
  content: 'เนื้อหาข่าวฉบับเต็ม...',
  contentEn: 'Full news content...',
  author: 'Pryde TV Team',
  tags: ['muaythai', 'boxing', 'news'],
}));

export const mockPrograms: ContentItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: `prog_${i + 1}`, title: `โปรแกรมมวยไทย วันที่ ${i + 1} มิ.ย. 2569`,
  titleEn: `Muay Thai Program June ${i + 1}, 2026`,
  description: `รายการมวยไทยประจำวัน ${i + 1}`,
  descriptionEn: `Daily Muay Thai Program Day ${i + 1}`,
  thumbnailUrl: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=400&h=300&fit=crop',
  category: 'muaythai', type: 'program' as const,
  dateTime: new Date(Date.now() + i * 86400000).toISOString(),
  isLive: i === 0, coinPrice: 0, slug: `program-jun-${i + 1}`, venue: i % 2 === 0 ? 'ราชดำเนิน' : 'ลุมพินี',
}));

export const mockResults: ResultItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: `res_${i + 1}`, title: `ผลการแข่งขัน ศึก Pryde Fight #${40 - i}`,
  titleEn: `Results: Pryde Fight #${40 - i}`,
  description: 'ผลการแข่งขันมวยไทย',
  descriptionEn: 'Muay Thai Fight Results',
  thumbnailUrl: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?w=400&h=300&fit=crop',
  category: 'muaythai', type: 'result' as const,
  dateTime: new Date(Date.now() - i * 604800000).toISOString(),
  isLive: false, coinPrice: 0, slug: `result-fight-${40 - i}`,
  matchups: [
    { id: `m_${i}_1`, redCorner: 'สมศักดิ์', blueCorner: 'Marcus', weightClass: 'Welterweight', round: 5, status: 'ended', result: 'Red Corner Win' },
    { id: `m_${i}_2`, redCorner: 'วิชิต', blueCorner: 'Kenji', weightClass: 'Lightweight', round: 3, status: 'ended', result: 'KO Blue Corner' },
  ],
  winner: i % 2 === 0 ? 'สมศักดิ์' : 'Kenji',
}));

// ─── Mock Fighters ──────────────────────────────────
export const mockFighters: Fighter[] = [
  { id: 'f_001', name: 'พลวัต จิตแจ่มใส', nameEn: 'Phonlawat Chitchamsai', rank: 'แชมป์มวยไทยรุ่นไลท์เวท', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', coverUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&h=400&fit=crop', weightClass: 'Welterweight', country: 'TH', gym: 'ค่ายเกียรติเพชร', wins: 100, losses: 0, draws: 0, ko: 50, ranking: 1, age: 26 },
  { id: 'f_002', name: 'คิม ธรรมชัย', nameEn: 'Kim Thammachai', rank: 'แชมป์คิกบ็อกซิ่งรุ่นสตรอว์เวท', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop', coverUrl: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=800&h=400&fit=crop', weightClass: 'Lightweight', country: 'TH', gym: 'ค่ายศิษย์สารวัตร', wins: 85, losses: 5, draws: 2, ko: 40, ranking: 2, age: 24 },
  { id: 'f_003', name: 'พงภักรดี ศรีเลิศ', nameEn: 'Phongphakdi Srilert', rank: 'แชมป์มวยไทยรุ่นสตรอว์เวท', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop', coverUrl: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?w=800&h=400&fit=crop', weightClass: 'Featherweight', country: 'TH', wins: 120, losses: 8, draws: 1, ko: 60, ranking: 3, age: 28 },
  { id: 'f_004', name: 'กรรมกร มาใจดี', nameEn: 'Kammakorn Maijaidee', rank: 'แชมป์คิกบ็อกซิ่งรุ่นไลท์เวท', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', coverUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&h=400&fit=crop', weightClass: 'Bantamweight', country: 'TH', wins: 95, losses: 12, draws: 3, ko: 45, ranking: 4, age: 23 },
  { id: 'f_005', name: 'แย้ม โสธร', nameEn: 'Yam Sothorn', rank: 'แชมป์บริการต่อผู้แบบผสมผสาน รุ่นแบนตั้มเวต', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop', coverUrl: 'https://images.unsplash.com/photo-1615117972428-28de67ac72d0?w=800&h=400&fit=crop', weightClass: 'Heavyweight', country: 'US', gym: 'Tiger Muay Thai', wins: 70, losses: 4, draws: 1, ko: 35, ranking: 5, age: 30 },
  { id: 'f_006', name: 'Kenji Yamamoto', nameEn: 'Kenji Yamamoto', rank: 'The Samurai', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop', coverUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&h=400&fit=crop', weightClass: 'Middleweight', country: 'JP', wins: 35, losses: 7, draws: 2, ko: 15, ranking: 6, age: 27 },
  { id: 'f_007', name: 'สุริยา ก.กำแพงเพชร', nameEn: 'Suriya Kor.Kamphaengphet', rank: 'แชมป์มวยสากลรุ่นแบนตั้มเวต', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', coverUrl: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=800&h=400&fit=crop', weightClass: 'Super Welterweight', country: 'TH', wins: 41, losses: 9, draws: 0, ko: 30, ranking: 7, age: 25 },
  { id: 'f_008', name: 'Pierre Dubois', nameEn: 'Pierre Dubois', rank: 'Le Boxeur', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop', coverUrl: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?w=800&h=400&fit=crop', weightClass: 'Lightweight', country: 'FR', wins: 30, losses: 6, draws: 1, ko: 18, ranking: 8, age: 29 },
  { id: 'f_009', name: 'กิตติศักดิ์ ช.ชัชวาล', nameEn: 'Kittisak Cho.Chatchawan', rank: 'แชมป์มวยไทยรุ่นฟลายเวท', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop', coverUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&h=400&fit=crop', weightClass: 'Flyweight', country: 'TH', wins: 48, losses: 3, draws: 1, ko: 25, ranking: 9, age: 22 },
  { id: 'f_010', name: 'Alex Rodriguez', nameEn: 'Alex Rodriguez', rank: 'El Fuego', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', coverUrl: 'https://images.unsplash.com/photo-1615117972428-28de67ac72d0?w=800&h=400&fit=crop', weightClass: 'Featherweight', country: 'MX', wins: 25, losses: 8, draws: 2, ko: 14, ranking: 10, age: 26 },
];

// ─── Mock Rankings ──────────────────────────────────
export const mockRankings: RankingItem[] = mockFighters.map((fighter, i) => ({
  rank: i + 1,
  fighter,
  weightClass: fighter.weightClass,
  points: 1000 - i * 50,
  change: (['up', 'same', 'down'] as const)[i % 3],
  changeAmount: i % 3 === 1 ? 0 : Math.floor(Math.random() * 3) + 1,
}));

// ─── Mock Coin Transactions ────────────────────────
export const mockCoinHistory: CoinTransaction[] = Array.from({ length: 10 }, (_, i) => ({
  id: `tx_${i + 1}`,
  type: (['topup', 'purchase', 'redeem', 'tip', 'topup', 'purchase', 'refund', 'topup', 'purchase', 'tip'] as const)[i],
  amount: [300, -99, 50, -20, 500, -79, 79, 100, -149, -30][i],
  description: [
    'เติมเหรียญ 300 coins', 'ซื้อ Live: Pryde Championship Night', 'แลกโค้ด PRYDE50',
    'อัดฉีด สมศักดิ์ ศิษย์ครูดำ', 'เติมเหรียญ 500 coins', 'ซื้อ Live: Pryde Fight League',
    'คืนเงิน: Live ถูกยกเลิก', 'เติมเหรียญ 100 coins', 'ซื้อ Live: Boxing Showdown',
    'อัดฉีด วิชิต ซิงห์มณี',
  ][i],
  createdAt: new Date(Date.now() - i * 172800000).toISOString(),
  status: 'completed',
}));
