import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../../services/course-service/course.service';
import { response } from 'express';
import { Course } from '../../models/course';
import { FormsModule } from '@angular/forms';
import { log } from 'console';
import { Lesson } from '../../models/lesson';
import { LessonService } from '../../services/lesson-service/lesson.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent implements OnInit {

  @ViewChild('editModal') editModal!: ElementRef;
  @ViewChild('addModal') addModal!: ElementRef;
  courses: Course[] = []
  formType: string = ''
  selectedCourse!: Course | null
  selectedLesson!: Lesson
  title: string = ''
  description: string = ''
  content: string = ''
  // teacherId: number = 0
  // courseId:number = 0

  constructor(private courseService: CourseService, private lessonService: LessonService) { }

  ngOnInit(): void {
    this.getCourses()

  }

  getCourses() {
    this.courseService.getCourses().subscribe({
      next: (response) => {
        this.courses = response
        this.courses.forEach(
          c => {
            this.lessonService.getLessonsByCourseId(c.id).subscribe({
              next: (response) => {
                c.lessons = response
                console.log(`course:${c.id} lessons:${c.lessons} response:${response}`);
              },
              error: e => alert(e.error.messege)
            })
          })
      },
      error: (e) => { alert(`ERROR::SOMETHING WRONG😠`) }
    })

  }

  getLessons() {
    this.courses.forEach(
      c => {
        this.lessonService.getLessonsByCourseId(c.id).subscribe({
          next: (response) => {
            c.lessons = response
            console.log("c.lessons");
            console.log(c.lessons);
            console.log("response:");
            console.log(response);
          },
          error: e => alert(e.error.messege`😠`)
        })
      })

  }

  addCourse() {
    this.courseService.addCourse({ title: this.title, description: this.description })
      .subscribe({
        next: (response) => {
          alert(`😊` + response.messege)
          this.getCourses()
        },
        error: (e) => { alert(e.error.messege`😠`) }
      })
    this.closeAddModal()
  }

  addLesson() {
    this.lessonService.addLesson({ title: this.title, content: this.content }, this.selectedCourse!.id)
      .subscribe({
        next: (response) => {
          this.getCourses()
        },
        error: (e) => { alert(e.error.messege + `😠`) }
      })
    this.closeAddModal()
  }

  updateCourse() {
    this.courseService.updateCourse(this.selectedCourse!.id,
      { id: this.selectedCourse!.id, title: this.title, description: this.description, teacherId: this.selectedCourse!.teacherId })
      .subscribe({
        next: (response) => {
          alert(`😊` + response.messege)
          this.getCourses()
        },
        error: (e) => { alert(e.error.messege + `😠`) }
      })
    this.closeEditModal()
  }

  updateLesson() {
    console.log(this.selectedCourse);
    console.log(this.selectedLesson);
    this.lessonService.updateLesson({ title: this.title, content: this.content, courseId: this.selectedCourse!.id }, this.selectedCourse!.id, this.selectedLesson.id)
      .subscribe({
        next: (response) => {
          alert(`😊` + response.messege)
          this.getCourses()
        },
        error: (e) => { alert(e.error.messege + `😠`) }
      })
    this.closeEditModal()
  }

  deleteCourse(id: number) {
    this.courseService.deleteCourse(id).subscribe({
      next: (response) => {
        alert(`😊` + response.messege)
        this.getCourses()
      },
      error: (e) => { alert(e.error.messege + `😠`) }
    })
  }

  deleteLesson(lessonId: number, courseId: number) {
    console.log(`Deleting lesson with ID: ${lessonId} for course ID: ${courseId}`);
    this.lessonService.deleteLesson(lessonId, courseId).subscribe({
      next: (response) => {
        alert(`😊` + response.messege)
        this.getLessons()
      },
      error: (e) => { alert(e.error.messege + `😠`) }
    })
    console.log(this.courses);
  }

  showLessons(course: Course) {
    this.getLessons()
    course.showLessons = !course.showLessons
  }

  openAddModal(type: string, course?: Course) {
    if (course)
      this.selectedCourse = course
    this.formType = type
    this.addModal.nativeElement.style.display = 'flex'
  }

  closeAddModal() {
    this.addModal.nativeElement.style.display = 'none'
    this.clear()
  }

  openEditModal(course: Course, type: string, lesson?: Lesson) {
    this.formType = type
    this.selectedCourse = course
    if (lesson)
      this.selectedLesson = lesson
    this.editModal.nativeElement.style.display = 'flex'
  }

  closeEditModal() {
    this.editModal.nativeElement.style.display = 'none'
    this.clear()
  }

  clear() {
    this.selectedCourse = null
    this.formType = ''
    this.title = ''
    this.description = ''
    this.content = ''
    // this.teacherId = 0
  }
}

