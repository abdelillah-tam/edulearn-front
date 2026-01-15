import { Component, input, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../model/user';
import { CourseService } from '../../services/course.service';
import { MatIcon } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-instructor',
  imports: [MatIcon, DecimalPipe, RouterLink, MatProgressSpinnerModule],
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.css',
})
export class InstructorComponent {
  user = input<User>();

  courses = signal<any>([]);

  isLoading = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private courseService: CourseService,
  ) {
    if (this.user() && this.user()?.type != 'Instructor') {
      this.router.navigate(['/']);
    }
    this.authService.isInstructor().subscribe((response) => {
      if (!response) {
        this.router.navigate(['/']);
      }
    });

    this.courseService.getInstructorCourses().subscribe((response) => {
      this.courses.set(response);
      this.isLoading = false;
    });
  }
}
