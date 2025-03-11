import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user-service/user.service';
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';
import { Course } from '../../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient, private userService: UserService) { }

  getCourses(): Observable<any> {
    return this.http.get<Course[]>('http://localhost:3000/api/courses', { headers: this.userService.getHeaders() })
  }

  getCourseById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/courses/${id}`, { headers: this.userService.getHeaders() })
  }

  addCourse(course: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/api/courses`, course, { headers: this.userService.getHeaders() })
  }

  updateCourse(courseId: number, course: Course): Observable<any> {

    return this.http.put<any>(`http://localhost:3000/api/courses/${courseId}`, course, { headers: this.userService.getHeaders() })
  }

  deleteCourse(courseId: number) {
    return this.http.delete<any>(`http://localhost:3000/api/courses/${courseId}`, { headers: this.userService.getHeaders() })
  }

  enrollCourse(id: number | undefined, user: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/courses/${id}/enroll`, user, { headers: this.userService.getHeaders() })
  }

  unenrollCourse(id: number | undefined, userId: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/courses/${id}/unenroll`, { body: { userId: userId }, headers: this.userService.getHeaders() })
  }

  getMyCourses(id: number | null): Observable<any> {
    return this.http.get<Course[]>(`http://localhost:3000/api/courses/student/${id}`, { headers: this.userService.getHeaders() });
  }

}
