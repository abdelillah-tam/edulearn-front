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
import { environment } from '../../environments/environment';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-signin',
  imports: [
    MatIconModule,
    RouterLink,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  selectedType: number = 0;

  signinFormGroup = new FormGroup({
    type: new FormControl('Student', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  isSigninLoading = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
    if (Boolean(localStorage.getItem('signed')).valueOf() === true) {
      this.router.navigate(['/']);
    }
  }

  selectType(index: number) {
    this.selectedType = index;
  }

  signin() {
    if (this.signinFormGroup.valid) {
      this.isSigninLoading = true;
      this.signinFormGroup.disable();
      lastValueFrom(
        this.httpClient.get(`${environment.API_CSRF}/sanctum/csrf-cookie`, {
          withCredentials: true,
        }),
      ).then((response) => {
        this.httpClient
          .post<boolean>(
            `${environment.API}/signin`,
            {
              type: this.signinFormGroup.value.type,
              email: this.signinFormGroup.value.email,
              password: this.signinFormGroup.value.password,
            },
            {
              withCredentials: true,
              headers: new HttpHeaders({
                'X-XSRF-TOKEN': getCsrfTokenCookie('XSRF-TOKEN')!,
              }),
            },
          )
          .subscribe((response) => {
            if (response === true) {
              localStorage.setItem('signed', String(response));
              this.router.navigate(['/']);
            }
          });
      });
    }
  }
}
