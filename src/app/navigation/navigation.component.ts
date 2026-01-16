import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RouterLink } from '@angular/router';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CourseService } from '../services/course.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../services/auth.service';
import { Observable, of, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-navigation',
  imports: [
    MatIconModule,
    RouterLink,
    NavMenuComponent,
    MatTooltipModule,
    AsyncPipe,
    MatProgressSpinnerModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  breakPointObserver = inject(BreakpointObserver);

  isSmallScreen = false;

  isOpenMenu = false;

  categoryList: string[] = [];

  isLoggedIn: Observable<boolean> | undefined;

  isLoggingOut = false;

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private renderer: Renderer2,
  ) {
    if (
      sessionStorage.getItem('signed') != null &&
      Boolean(sessionStorage.getItem('signed')) == true
    ) {
      this.isLoggedIn = of(true);
    } else {
      this.isLoggedIn = this.authService.isSignedIn().pipe(
        tap((loggedIn) => {
          if (loggedIn == true) {
            sessionStorage.setItem('signed', 'true');
          }
        }),
      );
    }
  }

  ngOnInit(): void {
    this.breakPointObserver.observe(['(width<40rem)']).subscribe((result) => {
      this.isSmallScreen = result.matches;
      if (!this.isSmallScreen) {
        this.isOpenMenu = false;
        this.changeBodyPosition();
      }
    });

    this.courseService.getCategoryList().subscribe((response) => {
      this.categoryList = response;
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
      this.renderer.addClass(document.body, 'fixed');
      this.renderer.addClass(document.body, 'w-full');
    } else {
      this.renderer.removeClass(document.body, 'fixed');
      this.renderer.removeClass(document.body, 'w-full');
    }
  }
}
