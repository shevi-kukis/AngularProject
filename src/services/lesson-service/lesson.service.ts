import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user-service/user.service';
import { Lesson } from '../../models/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient, private userService: UserService) { }

  getLessonsByCourseId(courseId: number | undefined): Observable<any> {
    return this.http.get<Lesson[]>(`http://localhost:3000/api/courses/${courseId}/lessons`, { headers: this.userService.getHeaders() })
  }

  addLesson(lesson: any, courseId: number): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/api/courses/${courseId}/lessons`, lesson, { headers: this.userService.getHeaders() })
  }

  updateLesson(lesson: any, courseId: number, id: number): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/api/courses/${courseId}/lessons/${id}`, lesson, { headers: this.userService.getHeaders() })
  }

  deleteLesson(lessonId: number, courseId: number) {
    return this.http.delete<any>(`http://localhost:3000/api/courses/${courseId}/lessons/${lessonId}`, { headers: this.userService.getHeaders() })
  }




}
