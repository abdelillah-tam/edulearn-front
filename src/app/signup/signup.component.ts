import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { User } from '../model/user';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../services/auth.service';
import { showSnack } from '../global/show-snack';
import { isSignedIn } from '../global/signed-in';

@Component({
  selector: 'app-signup',
  imports: [
    MatIconModule,
    RouterLink,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  selectedType: number = 0;

  signupFormGroup = new FormGroup(
    {
      type: new FormControl('Student', [Validators.required]),
      fullname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required]),
    },
    [this.passwordMatchValidator],
  );

  isSignupLoading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    if (isSignedIn()) {
      this.router.navigate(['/']);
    }
  }

  selectType(index: number) {
    this.selectedType = index;
  }

  signup() {
    this.isSignupLoading = true;

    if (this.signupFormGroup.valid) {
      let user: User = new User(
        this.signupFormGroup.value.fullname!,
        this.signupFormGroup.value.email!,
        this.signupFormGroup.value.type! as 'Instructor' | 'Student',
      );
      this.signupFormGroup.disable();
      this.authService.requestCsrfCookie().subscribe(() => {
        this.authService
          .signup(
            user,
            this.signupFormGroup.value.password!,
            this.signupFormGroup.value.password_confirmation!,
          )
          .subscribe((response) => {
            if (response == true) {
              this.isSignupLoading = false;
              showSnack('Signed Up Successfully', 'success');
              this.router.navigate(['/signin']);
            } else {
              this.signupFormGroup.enable();
              showSnack('Something Wrong! Try Again', 'success');
            }
          });
      });
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmation = control.get('password_confirmation');

    if (!password || !confirmation) {
      return null;
    }

    if (password.value !== confirmation.value) {
      console.log(true);
      return { passwordMismatch: true };
    }

    if (confirmation.value == '') {
      return null;
    }

    return null;
  }
}
