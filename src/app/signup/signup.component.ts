import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { User } from '../model/user';
import { getCsrfTokenCookie } from '../global/get-csrf-token-cookie';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-signup',
  imports: [MatIconModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  selectedType: number = 0;

  signupFormGroup = new FormGroup({
    type: new FormControl('Student', [Validators.required]),
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    password_confirmation: new FormControl('', [Validators.required]),
  });

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

  signup() {
    lastValueFrom(
      this.httpClient.get(`${environment.API}/sanctum/csrf-cookie`),
    ).then((response) => {
      if (this.signupFormGroup.valid) {
        let user: User = new User(
          this.signupFormGroup.value.fullname!,
          this.signupFormGroup.value.email!,
          this.signupFormGroup.value.type! as 'Instructor' | 'Student',
        );

        this.httpClient
          .post(
            `${environment.API}/api/signup`,
            {
              user: user,
              password: this.signupFormGroup.value.password,
              password_confirmation:
                this.signupFormGroup.value.password_confirmation,
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
              this.router.navigate(['/signin']);
            }
          });
      }
    });
  }
}
