export const API_MODE = process.env.NEXT_PUBLIC_API_MODE ?? 'mock';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.prydetv.com';

export function isMockMode(): boolean {
  return API_MODE === 'mock';
}
