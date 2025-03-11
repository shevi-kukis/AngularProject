import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addAuth(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/auth/register', user)
  }

  logIn(user: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/auth/login', user)
  }

  saveToken(token: string) {
    sessionStorage.setItem('token', token)
  }

  getToken() {
    return sessionStorage.getItem('token')
  }

  getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
  }

  getUserFromToken(): number | null {
    const token = this.getToken()
    if (!token) return null
    try {
      const decodedToken: any = jwtDecode(token)
      return decodedToken.userId
    }
    catch (error) {
      console.error('שגיאה בפענוח ה-Token:', error)
      return null
    }
  }

  Logout() {
    sessionStorage.removeItem('token')
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getUserRole(): string {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.role;
    }
    return 'guest'
  }
}
