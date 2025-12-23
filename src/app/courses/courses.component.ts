import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CourseItemComponent } from '../course-item/course-item.component';
import { FooterComponent } from '../footer/footer.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { CourseService } from '../services/course.service';
import { LoadingComponent } from '../loading/loading.component';
import { CategoryListComponent } from '../category/category.component';
import { CATEGORIES } from '../global/categories';
import { DifficultyComponent } from '../difficulty/difficulty.component';
import { DIFFICULTY } from '../global/difficulty-list';

@Component({
  selector: 'app-courses',
  imports: [
    NavigationComponent,
    MatSelectModule,
    CourseItemComponent,
    FooterComponent,
    MatIconModule,
    LoadingComponent,
    CategoryListComponent,
    DifficultyComponent,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  closedCategories = true;

  closedDifficulties = true;

  courses = [];

  selectedCategory = '';

  selectedDifficulty = '';

  categoryList: string[] = [CATEGORIES[0]];

  difficultyList: string[] = [DIFFICULTY[0]];

  isLoading = true;

  searchValue: string = '';

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.selectedCategory = this.categoryList[0];
    this.selectedDifficulty = this.difficultyList[0];
    this.retrieveCoursesList();

    this.courseService.getCategoryList().subscribe((response) => {
      this.categoryList.push(...response);
    });

    this.courseService.getDifficultyList().subscribe((response) => {
      this.difficultyList.push(...response);
    });
  }

  setSelectedCategory(category: string) {
    this.selectedCategory = category;
    this.closedCategories = true;
    this.retrieveCoursesList();
  }

  setSelectedDifficulty(difficulty: string) {
    this.selectedDifficulty = difficulty;
    this.closedCategories = true;
    this.retrieveCoursesList();
  }

  search(ev: Event) {
    this.searchValue = (ev.target as HTMLInputElement).value;
    this.retrieveCoursesList();
  }

  retrieveCoursesList() {
    this.courses = [];
    this.isLoading = true;
    this.courseService
      .retrievAllCourses(
        this.selectedCategory,
        this.selectedDifficulty,
        this.searchValue,
      )
      .subscribe((response) => {
        setTimeout(() => {
          this.courses = response;
          this.isLoading = false;
        }, 500);
      });
  }
}
