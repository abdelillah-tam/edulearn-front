import { Component, inject } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CourseService } from '../services/course.service';
import imageCompression from 'browser-image-compression';
import { LoadingComponent } from '../loading/loading.component';
import { CategoryListComponent } from '../category/category.component';
import { CATEGORIES } from '../global/categories';
import { DifficultyComponent } from '../difficulty/difficulty.component';
import { DIFFICULTY } from '../global/difficulty-list';
import { MatError } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-create-course',
  imports: [
    NavigationComponent,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    LoadingComponent,
    CategoryListComponent,
    DifficultyComponent,
    MatError,
    MatDialogModule,
  ],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css',
})
export class CreateCourseComponent {
  formBuilder = inject(FormBuilder);

  isLoading = false;

  categoryList = CATEGORIES.splice(1);

  difficultyList = DIFFICULTY.splice(1);

  closedCategoryList = true;

  closedDifficultyList = true;

  courseFormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    category: this.formBuilder.control('', [Validators.required]),
    duration: ['', Validators.required],
    difficulty: ['', Validators.required],
    objectives: this.formBuilder.array([
      this.formBuilder.control('', [Validators.required]),
    ]),
    prerequisites: ['', Validators.required],
    modules: this.formBuilder.array([
      this.formBuilder.group({
        title: this.formBuilder.control('', [Validators.required]),
        lessons: this.formBuilder.array([
          this.formBuilder.group({
            title: this.formBuilder.control('', [Validators.required]),
            duration: this.formBuilder.control('', [Validators.required]),
          }),
        ]),
      }),
    ]),
  });

  thumbnailFile: File | null = null;

  imageUrl: string | null = null;

  readonly dialog = inject(MatDialog);

  constructor(private courseService: CourseService) {}

  addObjective() {
    this.courseFormGroup.controls.objectives.push(
      this.formBuilder.control('', [Validators.required]),
    );
  }

  removeObjective(index: number) {
    this.courseFormGroup.controls.objectives.controls.splice(index, 1);
  }

  addModule() {
    this.courseFormGroup.controls.modules.push(
      this.formBuilder.group({
        title: this.formBuilder.control('', [Validators.required]),
        lessons: this.formBuilder.array([
          this.formBuilder.group({
            title: this.formBuilder.control('', [Validators.required]),
            duration: this.formBuilder.control('', [Validators.required]),
          }),
        ]),
      }),
    );
  }

  removeModule(index: number) {
    this.courseFormGroup.controls.modules.controls.splice(index, 1);
  }

  addLesson(moduleIndex: number) {
    this.courseFormGroup.controls.modules.controls[
      moduleIndex
    ].controls.lessons.controls.push(
      this.formBuilder.group({
        title: this.formBuilder.control('', [Validators.required]),
        duration: this.formBuilder.control('', [Validators.required]),
      }),
    );
  }

  removeLesson(moduleIndex: number, lessonIndex: number) {
    this.courseFormGroup.controls.modules.controls[
      moduleIndex
    ].controls.lessons.controls.splice(lessonIndex, 1);
  }

  onThumbnailAdded(e: any) {
    this.thumbnailFile = e.target.files[0];
    this.showImage();
  }

  showImage() {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.thumbnailFile!);
    fileReader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
  }

  submitCourse() {
    if (this.courseFormGroup.valid && this.thumbnailFile && this.imageUrl) {
      this.loading(true);
      imageCompression(this.thumbnailFile, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }).then((output) => {
        let objectiveValues: string[] = [];

        this.courseFormGroup.controls.objectives.controls.forEach((item) => {
          objectiveValues.push(item.value!);
        });

        let moduleValues: {
          title: string;
          lessons: { title: string; duration: string }[];
        }[] = [];

        this.courseFormGroup.controls.modules.controls.forEach((item) => {
          let lessons: { title: string; duration: string }[] = [];
          item.controls.lessons.controls.forEach((lessonControl) => {
            lessons.push({
              title: lessonControl.controls.title.value!,
              duration: lessonControl.controls.duration.value!,
            });
          });
          moduleValues.push({
            title: item.controls.title.value!,
            lessons: lessons,
          });
        });

        let course = new FormData();
        course.append('title', this.courseFormGroup.controls.title.value!);
        course.append(
          'description',
          this.courseFormGroup.controls.description.value!,
        );
        course.append(
          'category',
          this.courseFormGroup.controls.category.value!,
        );
        course.append(
          'difficulty',
          this.courseFormGroup.controls.difficulty.value!,
        );
        course.append(
          'duration',
          this.courseFormGroup.controls.duration.value!,
        );
        course.append('thumbnail', output);
        course.append('objectives', JSON.stringify(objectiveValues));
        course.append(
          'prerequisites',
          this.courseFormGroup.controls.prerequisites.value!,
        );
        course.append('modules', JSON.stringify(moduleValues));

        this.courseService.createCourse(course).subscribe((response) => {
          this.loading(false);
        });
      });
    }
  }

  setCategory(category: string) {
    this.closedCategoryList = true;

    this.courseFormGroup.controls.category.setValue(category);
  }

  setDifficulty(difficulty: string) {
    this.closedDifficultyList = true;
    this.courseFormGroup.controls.difficulty.setValue(difficulty);
  }

  loading(loading: boolean) {
    if (loading) {
      this.dialog.open(LoadingComponent, {
        width: '400px',
        height: '200px',
        disableClose: true,
      });
    } else {
      this.dialog.closeAll();
    }
  }
}
