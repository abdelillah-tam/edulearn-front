import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  imports: [NavigationComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {


  
}
