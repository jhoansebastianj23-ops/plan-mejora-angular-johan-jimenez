import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  get userName(): string {
    const user = this.authService.user;

    if (!user) {
      return '';
    }

    return `${user.firstName} ${user.lastName}`;
  }

  onLogout() {
    this.authService.logout();
  }
}
