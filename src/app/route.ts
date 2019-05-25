import { Routes } from '@angular/router';
import { LoginComponent } from './Login/Login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guard/auth.guard';
import { StudentListComponent } from './StudentList/StudentList.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { MyStudentsComponent } from './myStudents/myStudents.component';
import { ResourceComponent } from './resource/resource.component';
import { GradingComponent } from './grading/grading.component';
import { SystemSettingsComponent } from './systemSettings/systemSettings.component';


export const appRoutes: Routes = [
  // { path: 'login', component: LoginComponent },
  // {
  //   path: '',
  //   runGuardsAndResolvers: 'always',
  //   canActivate: [AuthGuard],
  //   children: [
  //     { path: 'home', component: HomeComponent, data: { roles: null }  },
  //     {
  //       path: 'students', component: StudentListComponent,
  //       data: { roles: "0" } 
  //     },
  //     {
  //       path: 'assignments', component: AssignmentComponent,
  //       data: { roles: "0" } 
  //     },
  //   ]
  // },
  // { path: "**", redirectTo: "home", pathMatch: "full" }

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      permission: {
        only: ['0', '1'],
        redirectTo: 'home'
      }
    }
  },
  {
    path: 'assignments',
    component: AssignmentComponent,
    canActivate: [AuthGuard],
    data: {
      permission: {
        only: ['0'],
        redirectTo: 'home'
      }
    }
  },
  {
    path: 'myStudents',
    component: MyStudentsComponent,
    canActivate: [AuthGuard],
    data: {
      permission: {
        only: ['1'],
        redirectTo: 'home'
      }
    }
  },
  {
    path: 'students',
    component: StudentListComponent,
    canActivate: [AuthGuard],
    data: {
      permission: {
        only: ['0'],
        redirectTo: 'home'
      }
    }
  },
  {
    path: 'resource',
    component: ResourceComponent,
    canActivate: [AuthGuard],
    data: {
      permission: {
        only: ['0'],
        redirectTo: 'home'
      }
    }
  },
  {
    path: 'systemSettings',
    component: SystemSettingsComponent,
    canActivate: [AuthGuard],
    data: {
      permission: {
        only: ['0'],
        redirectTo: 'home'
      }
    }
  },

  {
    path: 'grading/:id',
    component: GradingComponent,
    canActivate: [AuthGuard],
    data: {
      permission: {
        only: ['1'],
        redirectTo: 'home'
      }
    }
  },
  {
    path: 'login',
    component: LoginComponent
  },

  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }


];