import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatIconModule} from '@angular/material/icon';
import { CourseItemComponent } from '../course-item/course-item.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
    selector: 'app-home',
    imports: [NavigationComponent, CourseItemComponent,DecimalPipe, MatIconModule, FooterComponent,
        RouterLink
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

}
