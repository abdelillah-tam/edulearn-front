import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  snack = inject(MatSnackBar);

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  selectType(index: number) {
    this.selectedType = index;
  }

  signin() {
    if (this.signinFormGroup.valid) {
      this.isSigninLoading = true;
      this.signinFormGroup.disable();

      this.authService.requestCsrfCookie().subscribe(() => {
        this.authService
          .signin(
            this.signinFormGroup.value.email!,
            this.signinFormGroup.value.password!,
            this.signinFormGroup.value.type!,
          )
          .subscribe((response) => {
            if (response && response.email.length) {
              sessionStorage.setItem('signed', 'true');
              sessionStorage.setItem('user', JSON.stringify(response));
              this.showSnack('Signed In Successfully', 'success');
              this.router.navigate(['/']);
            } else {
              this.isSigninLoading = false;
              this.signinFormGroup.enable();
              this.showSnack(
                'Something Wrong ! Check Email And Password',
                'error',
              );
            }
          });
      });
    }
  }

  showSnack(value: string, type: 'success' | 'error') {
    this.snack.open(value, '', {
      panelClass: [`snack-${type}`],
      duration: 3000,
    });
  }
}
