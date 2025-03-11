import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course-service/course.service';
import { Course } from '../../models/course';
import { Lesson } from '../../models/lesson';
import { LessonService } from '../../services/lesson-service/lesson.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [RouterLink,MatButtonModule,MatCardModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {

  showAllLessons = false
  courseId!: number
  course!: Course
  lessons: Lesson[] = []

  constructor(private route: ActivatedRoute, private courseService: CourseService, private lessonService: LessonService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.courseId = Number(params.get('id'))
    });
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (response) => {
        this.course = response
      },
      error: (e) => { }
    })
    this.lessonService.getLessonsByCourseId(this.courseId).subscribe({
      next: (response) => { this.lessons = response },
      error: (e) => { alert(`❌ ERROR:${e.error.messege}`) }
    })
  }

  showLessons() {
    this.showAllLessons = !this.showAllLessons
  }
}
