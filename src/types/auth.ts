// Auth payload types matching the legacy fanmuay-member-main API

export interface LoginWithPhonePayload {
  member_phone: string;
  member_password: string;
  countryCode?: string;
  countryCallingCode?: string;
}

export interface RegisterPayload {
  member_phone: string;
  member_password: string;
  member_email?: string | null;
  member_gender?: string | null;
  member_birthday?: string | null;
  countryCode?: string;
  countryCallingCode?: string;
}

export interface ForgotPasswordPayload {
  phone: string;
}

// Legacy API response shape from /auth/member/login-v2
export interface AuthResponse {
  message: string;
  MemberID?: string;
  accessToken: string;
  data: {
    member_id: string;
    member_fname: string;
    member_avatar: string;
    member_phone?: string;
    member_email?: string;
    member_gender?: string;
    member_birthday?: string;
    member_coin?: number;
    member_point?: number;
    sync_line?: boolean;
  };
  // Compatibility fields for the Zustand store
  token: string;
  refreshToken: string;
  user: import('./user').User;
}

export type LoginProvider = 'phone' | 'line' | 'apple';
