import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course-service/course.service';
import { UserService } from '../../services/user-service/user.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [RouterLink,MatButtonModule,MatCardModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit {

  myCourses: Course[] = []
  flag = false
  constructor(private courseService: CourseService, private userService: UserService) { }

  ngOnInit(): void {
    this.courseService.getMyCourses(this.userService.getUserFromToken()).subscribe({
      next: response => this.myCourses = response,
      error: e => alert(e.error.messege + `😠`)
    })
    if (this.myCourses)
      this.flag = true
  }

}
