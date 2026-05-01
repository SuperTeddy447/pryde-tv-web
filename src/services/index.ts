import { isMockMode } from './config';
import { mockAuthService } from './mock/mockAuthService';
import { mockContentService } from './mock/mockContentService';
import { mockLiveService } from './mock/mockLiveService';
import { mockAccountService } from './mock/mockAccountService';

import { realAuthService } from './real/realAuthService';
import { realContentService } from './real/realContentService';
import { realLiveService } from './real/realLiveService';
import { realAccountService } from './real/realAccountService';

// Logic to switch between mock and real services
export const authService = isMockMode() ? mockAuthService : realAuthService;
export const contentService = isMockMode() ? mockContentService : realContentService;
export const liveService = isMockMode() ? mockLiveService : realLiveService;
export const accountService = isMockMode() ? mockAccountService : realAccountService;

// Also export individual services if needed, but the above is the primary way
export * from './config';
export { apiClient } from './apiClient';
