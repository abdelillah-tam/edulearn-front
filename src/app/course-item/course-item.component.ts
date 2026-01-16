import { DecimalPipe } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-course-item',
  imports: [DecimalPipe, MatIcon, MatProgressSpinnerModule],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.css',
})
export class CourseItemComponent {
  course = input<{
    id: number;
    title: string;
    description: string;
    duration: string;
    thumbnail: string;
    category: string;
    students: number;
    users_count: number;
    instructor_user: { fullname: string };
  }>();

  enrolled = output<boolean>();

  enrollLoading = false;

  constructor(
    private courseService: CourseService,
    private router: Router,
  ) {}

  shortDescription(description?: string) {
    const firstPeriod = description?.indexOf('.');

    if (firstPeriod !== -1) {
      // We add 1 to include the period itself
      let text = this.course()?.description.substring(0, firstPeriod! + 1);

      return text;
    }

    return firstPeriod;
  }

  enroll() {
    this.enrollLoading = true;
    this.courseService.enroll(this.course()!.id).subscribe((response) => {
      if (response) {
        this.enrollLoading = false;
        this.enrolled.emit(response);
      }
    });
  }

  moveToDetails() {
    this.router.navigate([`/course/${this.course()!.id}`]);
  }
}
