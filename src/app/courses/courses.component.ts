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
import { debounceTime } from 'rxjs';
import {
  FormControl,
  ReactiveFormsModule,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { MainSectionComponent } from '../custom-components/main-section/main-section.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EnrolledComponent } from "../enrolled/enrolled.component";

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
    ReactiveFormsModule,
    MainSectionComponent,
    EnrolledComponent
],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  title = 'Course Catalog';

  subtitle = 'Explore Our Courses';

  paragraph =
    'Browse through our extensive collection of expert-led courses and find the perfect one for you';

  closedCategories = true;

  closedDifficulties = true;

  courses: any[] = [];

  selectedCategory = '';

  selectedDifficulty = '';

  categoryList: string[] = [CATEGORIES[0]];

  difficultyList: string[] = [DIFFICULTY[0]];

  isLoading = true;

  searchValue: string = '';

  searchFormControl = new FormControl('');

  enrolled = false;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.selectedCategory = this.categoryList[0];
    this.selectedDifficulty = this.difficultyList[0];

    this.courseService.getCategoryList().subscribe((response) => {
      this.categoryList.push(...response);
    });

    this.courseService.getDifficultyList().subscribe((response) => {
      this.difficultyList.push(...response);
    });

    this.searchFormControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.router.navigate([], {
          queryParams: {
            search: value,
          },
          queryParamsHandling: 'merge',
        });
        this.retrieveCoursesList();
      });

    this.activatedRoute.queryParams.subscribe((values) => {
      this.searchFormControl.setValue(values['search']);
      this.retrieveCoursesList();
    });
  }

  setSelectedCategory(category: string) {
    this.selectedCategory = category;
    this.closedCategories = true;
    this.retrieveCoursesList();
  }

  setSelectedDifficulty(difficulty: string) {
    this.selectedDifficulty = difficulty;
    this.closedDifficulties = true;
    this.retrieveCoursesList();
  }

  retrieveCoursesList() {
    this.isLoading = true;
    this.courseService
      .retrievAllCourses(
        this.selectedCategory,
        this.selectedDifficulty,
        this.searchFormControl.value ?? '',
      )
      .subscribe((response) => {
        this.courses = response;
        this.isLoading = false;
      });
  }

  isEmptyCourses() {
    if (this.courses.length === 0) {
      return true;
    }
    return false;
  }
}
