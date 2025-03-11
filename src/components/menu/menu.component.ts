import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/userService/user.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,    MatToolbarModule,
    MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  private userId: string; // ה-ID של המשתמש
  //private token: string; // הטוקן של המשתמש
isTeacer:boolean =false
  constructor(private router: Router, private userService: UserService,private authService:AuthService) {

    // הנח שה-ID והטוקן נשמרים ב.איזשהו מקום, כמו ב-localStorage
    // this.userId = localStorage.getItem('userId') || ''; // או כל מקור אחר
    // this.token = localStorage.getItem('token') || ''; // או כל מקור אחר
    this.userId="1"
    //this.token="admin"
    console.log(authService.getRole())
    if(authService.getRole()!=='student')
      this.isTeacer=true
    console.log(this.isTeacer)
  }

  deleteUser() {
    // const confirmation = confirm("האם אתה בטוח שתרצה לצאת?");
    // if (confirmation) {
    //   this.userService.deleteUser(this.userId, this.token).subscribe(response => {
    //     // נווט לדף הכניסה או דף אחר לאחר המחיקה
    //     this.router.navigate(['/']);
    //   }, error => {
    //     console.error('Error deleting user:', error);
    //   });
    // }
  }
}
