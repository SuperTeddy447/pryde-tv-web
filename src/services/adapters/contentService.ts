import { isMockMode } from '../config';
import { mockContentService } from '../mock/mockContentService';

export function getContentService() {
  if (isMockMode()) {
    return mockContentService;
  }
  // TODO: Return real service when API is ready
  return mockContentService;
}
