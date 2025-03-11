import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course-service/course.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,MatButtonModule,MatCardModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {

  courses: Course[] = []
  myCourses: Course[] = []

  constructor(private courseService: CourseService, private userService: UserService) { }
  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (response) => {
        this.courses = response
      },
      error: (e) => { alert(e.messege) }
    })
    this.getMyCourses()
  }

  getMyCourses() {
    this.courseService.getMyCourses(this.userService.getUserFromToken()).subscribe({
      next: response => this.myCourses = response,
      error: e => alert(e.error.messege + `😠`)
    })
  }

  isEnroll(courseId: number): boolean {
    const course = this.myCourses.find(c => c.id == courseId)
    if (course)
      return true
    return false
  }

  enrollCourse(courseId: number) {
    const user = { userId: Number(this.userService.getUserFromToken()) };
    this.courseService.enrollCourse(courseId, user).subscribe({
      next: (response) => {
        alert(response.messege + `😊`)
        this.getMyCourses()
      },
      error: (e) => { alert(e.error.messege) }
    })
  }

  unenrollCourse(courseId: number) {
    const userId = Number(this.userService.getUserFromToken());
    this.courseService.unenrollCourse(courseId, userId).subscribe({
      next: (response) => {
        alert(response.messege + `😊`)
        this.getMyCourses()
      },
      error: (e) => { alert(e.error.messege + `😠`) }
    })
  }

}
