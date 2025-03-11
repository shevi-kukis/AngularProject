import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user-service/user.service';
import { MenuComponent } from "../components/menu/menu.component";
import { HomePageComponent } from "../components/home-page/home-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SignUpComponent, MenuComponent, HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'my-project';
  

  
}
