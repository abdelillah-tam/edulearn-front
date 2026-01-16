import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject, input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nav-menu',
  imports: [MatIconModule, RouterLink],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css',
})
export class NavMenuComponent implements OnInit {
  currentRouter: number = 0;
  isSmallScreen = false;

  isOpenMenu = input(false);

  breakPointObserver = inject(BreakpointObserver);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.breakPointObserver.observe(['(width<40rem)']).subscribe((result) => {
      this.isSmallScreen = result.matches;
    });
    if (this.router.url === '/courses') {
      this.currentRouter = 1;
    } else if (this.router.url === '/about') {
      this.currentRouter = 2;
    } else if (this.router.url === '/contact') {
      this.currentRouter = 3;
    }
  }

  courses() {
    this.router.navigate(['/courses'], {
      queryParams: {
        page: 1,
      },
    });
  }
}
