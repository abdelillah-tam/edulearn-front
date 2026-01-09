import { CanActivateChildFn } from '@angular/router';

export const instructorGuard: CanActivateChildFn = (childRoute, state) => {
  return true;
};
