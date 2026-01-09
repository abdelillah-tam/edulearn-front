import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { NavigationComponent } from '../navigation/navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { LoadingComponent } from '../loading/loading.component';
import { EnrolledComponent } from '../enrolled/enrolled.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-course-page',
  imports: [
    NavigationComponent,
    MatIconModule,
    DecimalPipe,
    FooterComponent,
    LoadingComponent,
    EnrolledComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.css',
})
export class CoursePageComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);

  course = signal<any>('');

  isLoading = true;

  enrolled = false;

  isEnrollLoading = false;
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.courseService.getCourse(params['id']).subscribe((response) => {
        this.course.set(response);
        this.isLoading = false;
      });
    });
  }

  enroll() {
    this.isEnrollLoading = true;
    this.courseService.enroll(this.course().id).subscribe((response) => {
      this.isEnrollLoading = false;
      this.enrolled = response;
    });
  }
}
