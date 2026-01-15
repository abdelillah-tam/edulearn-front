import { inject } from '@angular/core';
import {
  CanActivateFn,
  RedirectCommand,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const signedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  let isSigned = Boolean(sessionStorage.getItem('signed'));

  if (isSigned === true) {
    return true;
  } else {
    return authService.isSignedIn().pipe(
      map((result) => {
        if (result) {
          sessionStorage.setItem('signed', 'true');
          return true;
        } else {
          return new RedirectCommand(router.parseUrl(''));
        }
      }),
    );
  }
};

export const loggedOutGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isSignedIn().pipe(
    map((result) => {
      if (!result) {
        return true;
      } else {
        return new RedirectCommand(router.parseUrl(''));
      }
    }),
  );
};

export const studentGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  let userSessionStorage = sessionStorage.getItem('user');

  if (userSessionStorage && JSON.parse(userSessionStorage).type == 'Student') {
    return true;
  } else {
    return authService.isStudent().pipe(
      map((result) => {
        if (result) {
          return true;
        } else {
          return new RedirectCommand(router.parseUrl(''));
        }
      }),
    );
  }
};

export const instructorGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  let userSessionStorage = sessionStorage.getItem('user');

  if (
    userSessionStorage &&
    JSON.parse(userSessionStorage).type == 'Instructor'
  ) {
    return true;
  }
  
  return authService.isInstructor().pipe(
    map((result) => {
      if (result) {
        return true;
      } else {
        return new RedirectCommand(router.parseUrl(''));
      }
    }),
  );
};
