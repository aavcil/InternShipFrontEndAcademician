import { Component, OnInit } from '@angular/core';
import { AcademicianService } from 'src/services/academician.service';
import { Students } from 'src/models/Students';
import { fileUrl } from '../global';
import { error } from '@angular/compiler/src/util';
import * as XLSX from 'ts-xlsx';
import { RegisterForStudent } from 'src/models/RegisterForStudent';
import { AlertifyService } from 'src/services/Alertify.service';
import { StudentForAssignment } from 'src/models/StudentForAssignment';
import { Subject, BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-StudentList',
  templateUrl: './StudentList.component.html',
  styleUrls: ['./StudentList.component.scss']
})
export class StudentListComponent implements OnInit {

  constructor(private service: AcademicianService, private alertify: AlertifyService) { }
  students: BehaviorSubject<StudentForAssignment[]>=new BehaviorSubject<StudentForAssignment[]>(null);
  url = fileUrl;
  arrayBuffer: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  file: File;
  customLoadingTemplate;
  opt;
  public loading = true;
  ngOnInit() {
    this.getStudents();
    this.dtOptions={
      autoWidth:true,
      pagingType: 'full_numbers',
    }
  }



  getStudents() {
    this.loading = true;
    this.service.getStudents().subscribe(x => {
      this.students.next(x);
      this.loading = false;
      this.dtTrigger.next();
    }, err => {
      this.loading = false;
      console.log(err);
    });
  }
  incomingfile(event) {
    this.file = event.target.files[0];
  }

  async Upload() {
    let fileReader = new FileReader();
    fileReader.onload = async (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var x = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      if (x == null) {
        this.alertify.error("Önce Dosya Seçmelisiniz.");

      } else {
        for (let i = 0; i < x.length; i++) {
          var student = new RegisterForStudent();
          student.name = x[i]["Adı"];
          student.password = x[i]["Password"]
          student.tcNo = x[i]["TC Kimlik NO"]
          student.userName = x[i]["Username"]
          student.surname = x[i]["Soyadı"];
          await this.service.addStudent(student);
        }
        this.getStudents();
      }


    }

    fileReader.readAsArrayBuffer(this.file);
  }
}
