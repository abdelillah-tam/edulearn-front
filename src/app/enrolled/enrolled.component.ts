import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-enrolled',
  imports: [MatIcon, RouterLink, FooterComponent],
  templateUrl: './enrolled.component.html',
  styleUrl: './enrolled.component.css',
})
export class EnrolledComponent {
  constructor() {}
}
