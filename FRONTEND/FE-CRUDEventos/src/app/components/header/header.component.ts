import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrl: 'header.component.css',
})
export class HeaderComponent {
  isAuthenticated: boolean = false;
  currentUser: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.token$.subscribe((token) => {
      this.isAuthenticated = !!token;
      this.currentUser = this.authService.getCurrentUser();
    });
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
