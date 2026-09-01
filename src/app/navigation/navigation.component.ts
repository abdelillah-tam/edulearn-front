import {
  Component,
  inject,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router, RouterLink } from '@angular/router';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CourseService } from '../services/course.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../services/auth.service';
import { Observable, of, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { fixBodyTag, unfixBodyTag } from '../global/fix-body';
import { CATEGORIES } from '../global/categories';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  imports: [
    MatIconModule,
    RouterLink,
    NavMenuComponent,
    MatTooltipModule,
    AsyncPipe,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  breakPointObserver = inject(BreakpointObserver);

  isSmallScreen = false;

  isOpenMenu = false;

  categoryList: string[] = CATEGORIES;

  isSignIn: Observable<boolean> | undefined;

  isLoggingOut = false;

  promptController = new FormControl('', [Validators.required]);

  chatVisibility = false;

  chat: (
    | {
        ai_response: string;
        courses: {
          title: string;
          description: string;
          level: string;
          link: string;
        }[];
      }
    | string
  )[] = [];

  waitForResponseChat = false;

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private renderer: Renderer2,
    private router: Router,
  ) {
    this.isSignIn = this.authService.isSignedIn();
  }

  ngOnInit(): void {
    this.breakPointObserver.observe(['(width<40rem)']).subscribe((result) => {
      this.isSmallScreen = result.matches;
      if (!this.isSmallScreen) {
        this.isOpenMenu = false;
        this.changeBodyPosition();
      }
    });
  }

  logout() {
    this.isLoggingOut = true;
    this.authService.logout().subscribe((response) => {
      if (response === true) {
        sessionStorage.clear();

        window.location.reload();
      }
    });
  }

  openMenu() {
    this.isOpenMenu = true;
    this.changeBodyPosition();
  }

  closeMenu() {
    this.isOpenMenu = false;
    this.changeBodyPosition();
  }

  changeBodyPosition() {
    if (this.isOpenMenu) {
      fixBodyTag(this.renderer);
    } else {
      unfixBodyTag(this.renderer);
    }
  }

  navigateToCoursesCategory(category: string) {
    this.router.navigate(['/courses'], {
      queryParams: {
        category: category,
      },
      queryParamsHandling: 'replace',
    });
    this.closeMenu();
  }

  prompt() {
    if (
      this.promptController.valid &&
      this.waitForResponseChat == false &&
      this.promptController.enabled
    ) {
      this.chat.push(this.promptController.value!);
      this.waitForResponseChat = true;
      this.courseService
        .prompt(this.promptController.value!)
        .subscribe((response) => {
          this.chat.push(response);
          this.waitForResponseChat = false;
          this.promptController.enable();
        });
      this.promptController.disable();
      this.promptController.reset();
    }
  }

  changeChatVisibility() {
    this.chatVisibility = !this.chatVisibility;
  }

  printValue(value: any) {
    console.log(value);
  }
}
