import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { appRoutes } from './route';
import { CommonModule } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/Login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AlertifyService } from '../services/Alertify.service';
import localeTr from '@angular/common/locales/tr';
import { registerLocaleData } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ParticlesModule } from 'angular-particle';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { BrowserModule } from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DataTablesModule } from 'angular-datatables';
import { HomeComponent } from './home/home.component';
import { NgxLoadingModule } from 'ngx-loading';
import { StudentListComponent } from './StudentList/StudentList.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { MyStudentsComponent } from './myStudents/myStudents.component';
import { AuthGuard } from './_guard/auth.guard';
import { ResourceComponent } from './resource/resource.component';
import { GradingComponent } from './grading/grading.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SystemSettingsComponent } from './systemSettings/systemSettings.component';

registerLocaleData(localeTr, 'tr');
@NgModule({
   imports: [
      BrowserModule,
      NgxLoadingModule,
      BrowserAnimationsModule,
      NoopAnimationsModule,
      FormsModule,
      HttpClientModule,
      AngularEditorModule,
      MDBBootstrapModule.forRoot(),
      DataTablesModule,
      RouterModule,
      CommonModule,
      ReactiveFormsModule,
      NgbModule,
      RouterModule.forRoot(appRoutes),
      ToastrModule.forRoot(),
      ParticlesModule,
      NgCircleProgressModule.forRoot({
         "backgroundColor": "#CC3400",
         "radius": 60,
         "maxPercent": 200,
         "unitsColor": "#FFFFFF",
         "outerStrokeWidth": 5,
         "outerStrokeColor": "#FFFFFF",
         "innerStrokeColor": "#FFFFFF",
         "titleColor": "#FFFFFF",
         "subtitleColor": "#FFFFFF",
         "showSubtitle": false,
         "showInnerStroke": false,
         "startFromZero": false
      }),
      PdfViewerModule,
   ],
   declarations: [
      AppComponent,
      LoginComponent,
      NavbarComponent,
      SidebarComponent,
      HomeComponent,
      ResourceComponent,
      StudentListComponent,
      AssignmentComponent,
      MyStudentsComponent,
      GradingComponent,
      SystemSettingsComponent
   ],
   providers: [AlertifyService,AuthGuard,
      {provide: LOCALE_ID, useValue: 'tr-TR' }
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
