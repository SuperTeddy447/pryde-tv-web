import { isMockMode } from '../config';
import { mockAccountService } from '../mock/mockAccountService';

export function getAccountService() {
  if (isMockMode()) {
    return mockAccountService;
  }
  // TODO: Return real service when API is ready
  return mockAccountService;
}
