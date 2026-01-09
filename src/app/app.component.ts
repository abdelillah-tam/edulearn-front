import { Component } from '@angular/core';
import {
  GuardsCheckEnd,
  GuardsCheckStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { LoadingComponent } from './loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'EduLearn';

  loading = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof GuardsCheckStart) {
        this.loading = true;
      } else if (event instanceof GuardsCheckEnd) {
        this.loading = false;
      }
    });
  }
}
