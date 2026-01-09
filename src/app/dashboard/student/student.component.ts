import { Component, input } from '@angular/core';
import { User } from '../../model/user';
import { CourseService } from '../../services/course.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

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
    private router: Router,
  ) {
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
