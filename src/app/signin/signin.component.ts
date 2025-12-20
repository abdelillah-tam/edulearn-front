import { ɵparseCookieValue } from '@angular/common';
import {
  HttpClient,
  HttpClientXsrfModule,
  HttpHeaders,
  HttpXsrfTokenExtractor,
  withXsrfConfiguration,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { getCsrfTokenCookie } from '../global/get-csrf-token-cookie';

@Component({
  selector: 'app-signin',
  imports: [MatIconModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  selectedType: number = 0;

  signinGroup = new FormGroup({
    type: new FormControl('Student', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private httpClient: HttpClient, private router: Router) {
    if (Boolean(localStorage.getItem('signed')).valueOf() === true) {
      this.router.navigate(['/']);
    }
  }

  selectType(index: number) {
    this.selectedType = index;
  }

  signin() {
    lastValueFrom(
      this.httpClient.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      })
    ).then((response) => {
      if (this.signinGroup.valid) {
        this.httpClient
          .post<boolean>(
            'http://127.0.0.1:8000/api/signin',
            {
              type: this.signinGroup.value.type,
              email: this.signinGroup.value.email,
              password: this.signinGroup.value.password,
            },
            {
              withCredentials: true,
              headers: new HttpHeaders({
                'X-XSRF-TOKEN': getCsrfTokenCookie('XSRF-TOKEN')!,
              }),
            }
          )
          .subscribe((response) => {
            if (response === true) {
              localStorage.setItem('signed', String(response));
              this.router.navigate(['/']);
            }
          });
      }
    });
  }

}
