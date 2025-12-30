import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CourseItemComponent } from '../course-item/course-item.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';
import { MainSectionComponent } from '../custom-components/main-section/main-section.component';

@Component({
  selector: 'app-home',
  imports: [
    NavigationComponent,
    DecimalPipe,
    MatIconModule,
    FooterComponent,
    MainSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title = 'Welcome to EduLearn';
  subtitle = 'Transform Your Career with World-Class Education';
  paragraph =
    'Join millions of learners worldwide in mastering new skills and advancing your career with our expert-led courses';
}
