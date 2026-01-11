import { Component, input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../model/user';

@Component({
  selector: 'app-instructor',
  imports: [],
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.css',
})
export class InstructorComponent {
  user = input<User>();
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    if (this.user() && this.user()?.type != 'Instructor') {
      this.router.navigate(['/']);
    }
    this.authService.isInstructor().subscribe((response) => {
      if (!response) {
        this.router.navigate(['/']);
      }
    });
  }
}
