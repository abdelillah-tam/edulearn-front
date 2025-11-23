import { Component } from '@angular/core';
import { NavigationComponent } from "./navigation/navigation.component";
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-home',
    imports: [NavigationComponent, DecimalPipe],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

}
