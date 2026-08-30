import { Component } from '@angular/core';
import {
  GuardsCheckEnd,
  GuardsCheckStart,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { LoadingComponent } from './loading/loading.component';
import { AuthService } from './services/auth.service';
import { CourseService } from './services/course.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LoadingComponent,
    ReactiveFormsModule,
    NavigationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'EduLearn';

  loading = true;

  currentRoute = '/';

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof GuardsCheckStart) {
        this.loading = true;
      } else if (event instanceof GuardsCheckEnd) {
        this.loading = false;
      }
    });

    this.authService.getUser().subscribe((response) => {
      if (response) {
        sessionStorage.setItem('user', JSON.stringify(response));
      } else {
        sessionStorage.clear();
      }
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }
}
