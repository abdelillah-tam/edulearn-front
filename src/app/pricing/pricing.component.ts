import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pricing',
  imports: [MatIconModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css',
})
export class PricingComponent {
  starter = [
    'Access to 500+ courses',
    'Course completion certificates',
    'Downloadable resources',
    'Email support',
    'Community forum access',
  ];

  pro = [
    'Access to 500+ courses',
    'Course completion certificates',
    'Downloadable resources',
    'Priority 24/7 support',
    'Community forum access',
    'Lifetime access to purchased courses',
    'Early access to new courses',
    'Exclusive mentorship sessions',
  ];
}
