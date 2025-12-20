import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CourseItemComponent } from '../course-item/course-item.component';
import { FooterComponent } from '../footer/footer.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courses',
  imports: [
    NavigationComponent,
    MatSelectModule,
    CourseItemComponent,
    FooterComponent,
    MatIconModule,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  closedCategories = true;

  closedLevels = true;

  courses = [];

  categories: string[] = ['All Categories'];

  selectedCategoryIndex = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.retrievAllCourses().subscribe((response) => {
      this.courses = response;
    });

    this.courseService.getCategories().subscribe((response) => {
      this.categories.push(...response);
    });
  }

  selectCategory(index: number) {
    this.selectedCategoryIndex = index;
  }
}
