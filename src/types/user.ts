export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatarUrl: string;
  coinBalance: number;
  prydePointBalance: number;
  language: 'th' | 'en';
}

export interface UserProfile extends User {
  birthDate?: string;
  gender?: string;
}
