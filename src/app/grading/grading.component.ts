import { Component, OnInit } from '@angular/core';
import { AcademicianService } from 'src/services/academician.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Days } from 'src/models/Days';
import { BehaviorSubject } from 'rxjs';
import { Settings } from 'src/models/settings';
import { Grades } from 'src/models/Grades';
import { GradeResp } from 'src/models/GradeResp';
import { fileUrl } from '../global';
export const ITEMS = [
  {
    name: 'Kötü',
    value: 0
  },
  {
    name: 'Orta',
    value: 2.5

  },
  {
    name: 'İyi',
    value: 5

  },
  {
    name: 'Çok İyi',
    value: 7.5

  },
  {
    name: 'Mükemmel',
    value: 10

  },
];

export const Note = [
  {
    not: 0,
    value: 0
  },
  {
    not: 0,
    value: 1
  },
  {
    not: 0,
    value: 2
  },
  {
    not: 0,
    value: 3
  },
  {
    not: 0,
    value: 4
  },
  {
    not: 0,
    value: 5
  },
  {
    not: 0,
    value: 6
  },
];
@Component({
  selector: 'app-grading',
  templateUrl: './grading.component.html',
  styleUrls: ['./grading.component.scss']
})
export class GradingComponent implements OnInit {
  public isCollapsed = {};
  constructor(private service: AcademicianService, private activatedRoute: ActivatedRoute, private router: Router) { }
  public loading = true;
  Days: BehaviorSubject<Days[]>=new BehaviorSubject<Days[]>(null);
  settings: Settings = null;
  itemsList = ITEMS;
  noteList = Note;
  radioSel: any;
  radioSelected: string;
  radioSelectedString: string;
  total: number = 0;
  imageUrl=fileUrl;
  customLoadingTemplate;
  getGrade:GradeResp=null;
  isExist: any;
  studentId: number = null;
 async ngOnInit() {
   await this.activatedRoute.params.subscribe(params => {
      this.studentId = params["id"];
      this.service.isMyStudent(params["id"]).subscribe(x => {
        if (x) {
          this.service.getSettings().subscribe(q => {
            this.settings = q;
            this.service.isGradeExist(params["id"]).subscribe(x => {
              this.isExist = x;
            });
            if (this.settings.final )
            this.getDays(params["id"]);
            this.loading = false;
          });
        }
        else
          this.router.navigateByUrl("/myStudents");
      });
    });

    this.service.getGrades(this.studentId).subscribe(x=>{
      this.getGrade=x;
      console.log(this.getGrade);
    });
  }
  saveFinal(val){
    var q = new Grades();
    q.studentId = this.studentId;
    q.final = val;
    q.vize = 0;
    this.service.setGrade(q);
  }
  
  arrayOne(n: number): any[] {
    return Array(n);
  }
  toArray(photo: object) {
    console.log(photo);
    return Object.keys(photo);
  }
  onItemChange(item, event) {
    for (let i = 0; i < this.noteList.length; i++) {
      if (i == event.srcElement.attributes.name.value)
        this.noteList[i].not = item.value;
    }
  }

  saveNote(getNote) {
    for (let i = 0; i < this.noteList.length; i++) {
      this.total += this.noteList[i].not;
    }
    this.total += parseInt(getNote);
    var q = new Grades();
    q.studentId = this.studentId;
    q.vize = this.total;
    q.final = 0;
    this.service.setGrade(q);
  }
  getDays(id) {
    this.service.getDaysById(id).subscribe(x => {
      if (x) {
        this.Days.next(x);
        console.log(x);
        this.loading = false;
      }
    });
  }

}
