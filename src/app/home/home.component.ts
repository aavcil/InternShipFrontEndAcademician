import { Component, OnInit } from '@angular/core';
import { AssignmentForStudent } from 'src/models/AssignmentForStudent';
import { AcademicianService } from 'src/services/academician.service';
import { Assignment } from 'src/models/Assignment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/services/Alertify.service';
import { userGroup } from '../global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private academicianService: AcademicianService, private _modalService: NgbModal, private alertify: AlertifyService) { }
  public loading = false;
  assignment: Assignment[] = [];
  customLoadingTemplate;
  userGroup=userGroup;
  ngOnInit() {
    this.getAssignment();
  }
  open(content) {
    this._modalService.open(content);
  }

 
  getAssignment() {
    this.academicianService.getAssignment().subscribe(x => {
      this.assignment = x;
      this.loading = false;

    }, err => {
      console.log(err);
      this.loading = false;
    });
  }

  setAssignment() {
    this._modalService.dismissAll();
    this.loading = true;
    this.academicianService.setAssignment().subscribe(x => {
      this.loading = false;
      this.getAssignment();
      this.alertify.success("Atama işlemi başarıyla yapıldı.")

    }, err => {
      console.log(err); this.loading = false;
      this.alertify.error("Atama işlemi başarısız oldu.")

    });
  }
}
