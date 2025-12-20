import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterLink,
} from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-navigation',
  imports: [MatIconModule, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  isSigned: boolean = false;

  hideDropdown: boolean = true;

  constructor(private router: Router, private httpClient: HttpClient) {
    this.isSigned = Boolean(localStorage.getItem('signed'));
  }

  currentRouter: number = 0;

  ngOnInit(): void {
    if (this.router.url === '/courses') {
      this.currentRouter = 1;
    } else if (this.router.url === '/about') {
      this.currentRouter = 2;
    } else if (this.router.url === '/contact') {
      this.currentRouter = 3;
    }
  }

  showDropdown() {
    this.hideDropdown = !this.hideDropdown;
  }

  logout() {
    lastValueFrom(
      this.httpClient.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      })
    ).then((result) => {
      this.httpClient
        .post<string>(
          `${environment.API}/logout`,
          {},
          {
            withCredentials: true,
          }
        )
        .subscribe((response) => {
          if (response === 'done') {
            localStorage.clear();

            window.location.reload();
          }
        });
    });
  }
}
