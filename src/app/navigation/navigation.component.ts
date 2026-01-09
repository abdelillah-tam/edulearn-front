import { HttpClient } from '@angular/common/http';
import {
  AnimationCallbackEvent,
  Component,
  inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver } from '@angular/cdk/layout';

import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CourseService } from '../services/course.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  imports: [MatIconModule, RouterLink, NavMenuComponent, MatTooltipModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  isSigned: boolean = false;

  hideDropdown: boolean = true;

  breakPointObserver = inject(BreakpointObserver);

  isSmallScreen = false;

  isOpenMenu = false;

  categoryList: string[] = [];

  constructor(
    private httpClient: HttpClient,
    private courseService: CourseService,
    private authService: AuthService,
    private renderer: Renderer2,
  ) {
    if (localStorage.getItem('signed') === 'true') {
      this.isSigned = true;
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

  showDropdown() {
    this.hideDropdown = !this.hideDropdown;
  }

  showMenu() {
    if (this.isSmallScreen) {
    }
  }

  logout() {
    this.authService.logout().subscribe((response) => {
      if (response === true) {
        localStorage.clear();

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
