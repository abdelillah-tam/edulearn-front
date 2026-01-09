import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-enrolled',
  imports: [MatIcon, RouterLink],
  templateUrl: './enrolled.component.html',
  styleUrl: './enrolled.component.css',
})
export class EnrolledComponent {
  constructor(private router: Router) {}
}
