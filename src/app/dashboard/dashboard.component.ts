import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { InstructorComponent } from './instructor/instructor.component';
import { StudentComponent } from './student/student.component';
import { FooterComponent } from "../footer/footer.component";
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-dashboard',
  imports: [
    NavigationComponent,
    RouterLink,
    InstructorComponent,
    StudentComponent,
    FooterComponent,
    LoadingComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  user: any = '';

  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe((response) => {
      this.user = response;
    });
  }
}
