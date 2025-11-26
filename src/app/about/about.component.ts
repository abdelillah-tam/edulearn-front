import { Component } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { DecimalPipe } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-about',
  imports: [NavigationComponent, DecimalPipe, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {

}
