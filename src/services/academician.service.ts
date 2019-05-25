import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertifyService } from './Alertify.service';
import { apiUrl, teacherId } from 'src/app/global';
import { Observable } from 'rxjs';
import { Students } from 'src/models/Students';
import { AssignmentForStudent } from 'src/models/AssignmentForStudent';
import { Assignment } from 'src/models/Assignment';
import { StudentForAssignment, StudentForAcademician } from 'src/models/StudentForAssignment';
import { Recourse } from 'src/models/Recourse';
import { Days } from 'src/models/Days';
import { Settings } from 'src/models/settings';
import { GradeResp } from 'src/models/GradeResp';

@Injectable({
  providedIn: 'root'
})
export class AcademicianService {

  constructor(private httpClient: HttpClient,private router:Router,private alertify:AlertifyService) { }

  path = apiUrl;
  
  getStudents(): Observable<StudentForAssignment[]> {
    return this.httpClient.get<StudentForAssignment[]>(this.path + "Students/getStudentForHome");
  }
  
  getSettings():Observable<Settings>{
    return this.httpClient.get<Settings>(this.path + "Academician/getSettings");
  }
  setAssignment(){
    return this.httpClient.get(this.path + "InternShip/Assignment");
  }

  setGradingSettings(num){
    return this.httpClient.get(this.path + "Academician/settings?num="+num);
  }

  isGradeExist(id){
    return this.httpClient.get(this.path + "Grades/IsGradeExist?id="+id);
  }
  isMyStudent(studentId){
    return this.httpClient.get(this.path + "Academician/isMyStudent?studentId="+studentId+"&academicianId="+teacherId);
  }

  setRecourse(id){
    return this.httpClient.get(this.path + "Recourse/SetRecourse?id="+id);
  }
  setRecourseReject(id){
    return this.httpClient.get(this.path + "Recourse/SetRecourseReject?id="+id);
  }
  getAssignment(): Observable<Assignment[]> {
    return this.httpClient.get<Assignment[]>(this.path + "InternShip/GetAllAssignment");
  }
  getGrades(id): Observable<GradeResp> {
    return this.httpClient.get<GradeResp>(this.path + "Grades/GetGrade?id="+id);
  }
  getDaysById(id): Observable<Days[]> {
    return this.httpClient.get<Days[]>(this.path + "Days?id=" + id);
  }
  getRecourseFalse(): Observable<Recourse[]> {
    return this.httpClient.get<Recourse[]>(this.path + "Recourse/GetRecoursesFalse");
  }
  getRecourse(): Observable<Recourse[]> {
    return this.httpClient.get<Recourse[]>(this.path + "Recourse");
  }
  getStudentsForAcademician(): Observable<StudentForAcademician[]> {
    return this.httpClient.get<StudentForAcademician[]>(this.path + "Academician?id="+teacherId);
  }
  getAssignmentForStudent(id):Observable<AssignmentForStudent>{
    return this.httpClient.get<AssignmentForStudent>(this.path+"InternShip/getAssignment?id="+id);
   }

   addStudent(student) {
    this.httpClient.post(this.path + "Auth/register", student).subscribe(data => {
      this.alertify.success("Öğrenci Ekleme İşlemi Başarılı.");
    });
  }

  addDate(date) {
    this.httpClient.post(this.path + "SpecificDays", date).subscribe(data => {
      this.alertify.success("Staj Tarihi Ekleme İşlemi Başarılı!");
    });
  }

  setGrade(grade) {
    this.httpClient.post(this.path + "Grades", grade).subscribe(data => {
      this.alertify.success("Not girişi başarılı");
    });
  }
}
