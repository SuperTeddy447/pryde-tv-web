import { isMockMode } from '../config';
import { mockLiveService } from '../mock/mockLiveService';

export function getLiveService() {
  if (isMockMode()) {
    return mockLiveService;
  }
  // TODO: Return real service when API is ready
  return mockLiveService;
}
