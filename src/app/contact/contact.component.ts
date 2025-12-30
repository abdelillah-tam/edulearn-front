import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../footer/footer.component';
import { MainSectionComponent } from "../custom-components/main-section/main-section.component";

@Component({
  selector: 'app-contact',
  imports: [NavigationComponent, MatIconModule, FooterComponent, MainSectionComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  title = 'Get In Touch';

  subtitle = 'Contact Us';

  paragraph = `Have questions? We'd love to hear from you. Send us a message and we'll
      respond as soon as possible.`;
}
