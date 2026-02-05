import { Component } from '@angular/core';
import {
  GuardsCheckEnd,
  GuardsCheckStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { LoadingComponent } from './loading/loading.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'EduLearn';

  loading = true;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    console.log(document.cookie);
    this.router.events.subscribe((event) => {
      if (event instanceof GuardsCheckStart) {
        this.loading = true;
      } else if (event instanceof GuardsCheckEnd) {
        this.loading = false;
      }
    });

    this.authService.getUser().subscribe((response) => {
      if (response) {
        sessionStorage.setItem('signed', 'true');
        sessionStorage.setItem('user', JSON.stringify(response));
      }
    });
  }
}
