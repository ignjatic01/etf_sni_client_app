import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) { }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_token_full');
    document.cookie = "auth_token=; Path=/; Domain=localhost; Max-Age=0";
    this.router.navigate(['/login']);
  }
}
