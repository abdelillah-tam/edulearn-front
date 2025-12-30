import { Component, input } from '@angular/core';

@Component({
  selector: 'app-main-section',
  imports: [],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.css',
})
export class MainSectionComponent {
  title = input();
  subtitle = input();
  paragraph = input();
}
