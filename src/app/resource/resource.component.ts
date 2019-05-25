import { Component, OnInit } from '@angular/core';
import { Recourse } from 'src/models/Recourse';
import { AcademicianService } from 'src/services/academician.service';
import { fileUrl } from '../global';
import { NgbModal, NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/services/Alertify.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

  constructor(private academic: AcademicianService,private modalService: NgbModal,config: NgbTabsetConfig,private _alertify:AlertifyService) { 
    config.justify = 'center';
    config.type = 'pills';
  }
  Recourses: BehaviorSubject<Recourse[]> = new BehaviorSubject<Recourse[]>(null);
  RecoursesFalse: BehaviorSubject<Recourse[]> = new BehaviorSubject<Recourse[]>(null);

  imageUrl:string=fileUrl;
  popupUrl:string=null;
  loading;
  customLoadingTemplate
  ngOnInit() {
   this.getRecourse();
  }
  openLg(content,imageUrl) {
    this.modalService.open(content, { size: 'lg' });
    this.popupUrl=imageUrl;
  }

  getRecourse(){
    this.academic.getRecourse().subscribe(x => {
      this.Recourses.next(x);
    });
    this.academic.getRecourseFalse().subscribe(x => {
      this.RecoursesFalse.next(x);
    });
  }
  setRecourse(id){    
    this.academic.setRecourse(id).subscribe(x=>{
      this.getRecourse();    
      this._alertify.success("Onaylama İşlemi Başarılı")
    });
  }
  setRecourseReject(id){
    this.academic.setRecourseReject(id).subscribe(x=>{
      this.getRecourse();
      this._alertify.success("Reddetme İşlemi Başarılı")
    });
  }

}
