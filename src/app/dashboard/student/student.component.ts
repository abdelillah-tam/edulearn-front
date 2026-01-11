import { Component, input } from '@angular/core';
import { User } from '../../model/user';
import { CourseService } from '../../services/course.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-student',
  imports: [MatProgressSpinnerModule, MatIconModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent {
  user = input<User>();

  courses: any = [];

  isLoading = true;

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private router: Router,
  ) {
    if (this.user() && this.user()?.type != 'Student') {
      this.router.navigate(['/']);
    }
    this.courseService.getCoursesEnrolled().subscribe((response) => {
      this.courses = response;
      this.isLoading = false;
    });
  }

  educate(id: number) {
    this.router.navigate(['/education'], {
      queryParams: { course: id },
    });
  }
}
