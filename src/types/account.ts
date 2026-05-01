import type { User } from './user';

export type CoinTransactionType = 'topup' | 'purchase' | 'redeem' | 'refund' | 'tip';

export interface UserProfile extends User {
  // Add extra profile fields if needed
}

export interface CoinTransaction {
  id: string;
  type: CoinTransactionType;
  amount: number;
  description: string;
  createdAt: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface CoinTopupPayload {
  amount: number;
  paymentMethod: string;
}

export interface RedeemCodePayload {
  code: string;
}

export interface UpdateProfilePayload {
  name: string;
  phone?: string;
  avatarUrl?: string;
  language?: 'th' | 'en';
}

export interface TvQrCode {
  qrUrl: string;
  code: string;
  expiresAt: string;
}

export interface CoinPackage {
  id: string;
  amount: number;
  price: number;
  bonus: number;
  currency: string;
  popular?: boolean;
}
