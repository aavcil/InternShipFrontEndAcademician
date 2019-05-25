import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Assignment } from 'src/models/Assignment';
import { AcademicianService } from 'src/services/academician.service';
@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {

  constructor(private service: AcademicianService) { 

  }

  opt: DataTables.Settings = {};
  trig = new Subject();
  public loading = false;
  assignment: Assignment[] = [];
  dtOptions;
  customLoadingTemplate;

  ngOnInit() {
this.getAssignment();
this.opt={
  autoWidth:true,
  pagingType: 'full_numbers',
}
  }

  getAssignment() {
    this.service.getAssignment().subscribe(x => {
      this.assignment = x;
      console.log(x);
      this.loading = false;
      this.trig.next();
    });

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.trig.unsubscribe();
  }
}
