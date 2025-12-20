import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-contact',
  imports: [NavigationComponent, MatIconModule, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {

}
