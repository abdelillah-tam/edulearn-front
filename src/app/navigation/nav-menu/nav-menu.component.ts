import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject, input, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { unfixBodyTag } from '../../global/fix-body';

@Component({
  selector: 'app-nav-menu',
  imports: [MatIconModule],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css',
})
export class NavMenuComponent implements OnInit {
  currentRoute: number = 0;
  isSmallScreen = false;

  isOpenMenu = input(false);

  breakPointObserver = inject(BreakpointObserver);

  

  constructor(
    private router: Router,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.breakPointObserver.observe(['(width<40rem)']).subscribe((result) => {
      this.isSmallScreen = result.matches;
    });
    this.changeCurrentRoute();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeCurrentRoute();
      }
    });
  }

  navigate(path: string) {
    unfixBodyTag(this.renderer);
    this.router.navigate([`/${path}`]);
  }

  changeCurrentRoute() {
    if (this.router.url === '/courses') {
      this.currentRoute = 1;
    } else if (this.router.url === '/about') {
      this.currentRoute = 2;
    } else if (this.router.url === '/contact') {
      this.currentRoute = 3;
    }else if(this.router.url === '/pricing'){
      this.currentRoute = 4;
    }
  }
}
