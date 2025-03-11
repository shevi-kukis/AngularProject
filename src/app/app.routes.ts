import { Routes } from '@angular/router';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { LoginComponent } from '../components/login/login.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { CourseDetailsComponent } from '../components/course-details/course-details.component';
import { CourseManagementComponent } from '../components/course-management/course-management.component';
import { MyCoursesComponent } from '../components/my-courses/my-courses.component';
import { AuthGuard } from '../guards/auth-guard/auth.guard';

export const routes: Routes = [
    { path: 'sign-up', component: SignUpComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: HomePageComponent },
    { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
    { path: 'courseDetails/:id', component: CourseDetailsComponent, canActivate: [AuthGuard] },
    { path: 'courseManage', component: CourseManagementComponent, canActivate: [AuthGuard],  },
    { path: 'myCourses', component: MyCoursesComponent, canActivate: [AuthGuard], }
];
