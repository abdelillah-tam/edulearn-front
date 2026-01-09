import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  isLoggedIn() {
    return this.httpClient.get<boolean>(`${environment.API}/test`, {
      withCredentials: true,
    });
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
}
