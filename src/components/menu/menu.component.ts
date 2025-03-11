import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatMenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private userService: UserService, private router: Router) { }

  getFromSessionStorage(key: string): string | null {
    return sessionStorage.getItem(key)
  }

  getUserRole() {

    return this.userService.getUserRole()
  }

  Logout() {
    this.userService.Logout()
    this.router.navigate(['/'])
  }

}
