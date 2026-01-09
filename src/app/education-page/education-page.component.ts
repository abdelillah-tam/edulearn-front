import { Component, OnInit, Renderer2, signal } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { distinctUntilChanged } from 'rxjs';
import { LoadingComponent } from '../loading/loading.component';
import { FooterComponent } from '../footer/footer.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-education-page',
  imports: [NavigationComponent, LoadingComponent, FooterComponent, MatIcon],
  templateUrl: './education-page.component.html',
  styleUrl: './education-page.component.css',
})
export class EducationPageComponent implements OnInit {
  course = signal<any>('');

  isLoading = true;

  lessonId = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private renderer: Renderer2,
    private router: Router,
  ) {
    this.initialCourse();
    this.activatedRoute.queryParams.subscribe((params) => {
      this.lessonId = params['lesson'];
    });
  }

  ngOnInit(): void {}

  moveToLesson(moduleIndex: number, lessonIndex: number) {
    this.router.navigate([], {
      queryParams: {
        lesson: this.course().modules[moduleIndex].lessons[lessonIndex].id,
      },
      queryParamsHandling: 'merge',
    });
  }

  initialCourse() {
    let courseId = this.activatedRoute.snapshot.queryParams['course'];
    let lessonId = this.activatedRoute.snapshot.queryParams['lesson'];

    if (courseId) {
      this.courseService.getCourse(courseId).subscribe((response) => {
        this.course.set(response);
        if (!lessonId) {
          this.moveToLesson(0, 0);
        }
        this.isLoading = false;
      });
    }
  }

  onVideoEnded() {
    this.courseService
      .setWatched(this.activatedRoute.snapshot.queryParams['lesson'])
      .subscribe((response) => {
        if (response == true) {
          this.initialCourse();
        }
      });
  }
}
