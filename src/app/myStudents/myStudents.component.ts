import { Component, OnInit } from '@angular/core';
import { StudentForAssignment, StudentForAcademician } from 'src/models/StudentForAssignment';
import { Subject } from 'rxjs';
import { AcademicianService } from 'src/services/academician.service';
import { fileUrl } from '../global';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myStudents',
  templateUrl: './myStudents.component.html',
  styleUrls: ['./myStudents.component.scss']
})
export class MyStudentsComponent implements OnInit {

  constructor(private service:AcademicianService,private route:Router) { }
  public loading = true;
  students: StudentForAcademician[] = [];
  optStudent: DataTables.Settings = {};
  trigStudent = new Subject();
  url = fileUrl;
  customLoadingTemplate;
  ngOnInit() {
    this.getStudents();
    this.optStudent={
      autoWidth:true,
      pagingType: 'full_numbers',
    }
  }

  getStudents() {
    this.students = [];
    this.loading = true;
    this.service.getStudentsForAcademician().subscribe(x => {
      this.students = x;
      this.loading = false;
      this.trigStudent.next();
    }, err => {
      this.loading = false;
      console.log(err);
    });
  }
  redirect(id){
    this.route.navigateByUrl("/grading/"+id);
  }
}
