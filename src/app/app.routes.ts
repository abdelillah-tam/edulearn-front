import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import {
  instructorGuard,
  signedInGuard,
  loggedOutGuard,
  studentGuard,
} from './guards/auth.guard';
import { CoursePageComponent } from './course-page/course-page.component';
import { EnrolledComponent } from './enrolled/enrolled.component';
import { EducationPageComponent } from './education-page/education-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'courses',
    component: CoursesComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [loggedOutGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [loggedOutGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [signedInGuard],
  },
  {
    path: 'create',
    component: CreateCourseComponent,
    canActivate: [signedInGuard, instructorGuard],
  },
  {
    path: 'course/:id',
    component: CoursePageComponent,
  },
  {
    path: 'enrolled',
    component: EnrolledComponent,
  },
  {
    path: 'education',
    component: EducationPageComponent,
    canActivate: [signedInGuard, studentGuard],
  },
];
