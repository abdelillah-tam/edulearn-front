import { Component } from '@angular/core';
import { NavigationComponent } from "./navigation/navigation.component";
import {MatSelectModule} from '@angular/material/select';
import { CourseItemComponent } from '../course-item/course-item.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-courses',
  imports: [NavigationComponent, MatSelectModule, CourseItemComponent, FooterComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {

}
