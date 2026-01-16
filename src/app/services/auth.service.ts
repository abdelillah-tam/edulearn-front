import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../model/user';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  isSignedIn() {
    return this.httpClient
      .post<boolean>(
        `${environment.API}/signedIn`,
        {},
        { withCredentials: true },
      )
      .pipe(
        catchError((error) => {
          return of(false);
        }),
      );
  }

  getUser() {
    return this.httpClient.get<any>(`${environment.API}/getUser`, {
      withCredentials: true,
    });
  }

  logout() {
    return this.httpClient.get<boolean>(`${environment.API}/logout`, {
      withCredentials: true,
    });
  }

  isInstructor() {
    return this.httpClient.get<boolean>(`${environment.API}/isInstructor`, {
      withCredentials: true,
    });
  }

  isStudent() {
    return this.httpClient.get<boolean>(`${environment.API}/isStudent`, {
      withCredentials: true,
    });
  }

  requestCsrfCookie() {
    return this.httpClient.get(`${environment.API_CSRF}/sanctum/csrf-cookie`);
  }

  signup(user: User, password: string, passwordConfirmation: string) {
    return this.httpClient.post(
      `${environment.API}/signup`,
      {
        user: user,
        password: password,
        password_confirmation: passwordConfirmation,
      },
      {
        withCredentials: true,
      },
    );
  }

  signin(email: string, password: string, type: string) {
    return this.httpClient.post<User>(
      `${environment.API}/signin`,
      {
        type: type,
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      },
    );
  }
}
