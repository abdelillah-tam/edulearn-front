import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../footer/footer.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { MainSectionComponent } from '../custom-components/main-section/main-section.component';
import { isSignedIn } from '../global/signed-in';

@Component({
  selector: 'app-about',
  imports: [
    NavigationComponent,
    DecimalPipe,
    FooterComponent,
    MatIconModule,
    MainSectionComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  title = 'About EduLearn';

  subtitle = 'Empowering Learners Worldwide';

  paragraph = `We're on a mission to make quality education accessible to everyone`;

  isSignedIn = isSignedIn();
}
