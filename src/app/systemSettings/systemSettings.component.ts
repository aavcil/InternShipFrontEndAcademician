import { Component, OnInit } from '@angular/core';
import { AcademicianService } from 'src/services/academician.service';
import { AlertifyService } from 'src/services/Alertify.service';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { InternShipDates } from 'src/models/InternShipDates';

@Component({
  selector: 'app-systemSettings',
  templateUrl: './systemSettings.component.html',
  styleUrls: ['./systemSettings.component.scss']
})
export class SystemSettingsComponent implements OnInit {

  constructor(private service:AcademicianService,private alertify:AlertifyService,calendar: NgbCalendar) { 
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  num:number;
  ngOnInit() {
  }
  onItemChange(item) {
    this.num=item;
    console.log(this.num);
  }
  open() {
    console.log(this.num);
    if (this.num == 0) {
      this.service.setGradingSettings(1234).subscribe(x=>{
        this.alertify.success("Not Sistemi Kapalı");
      });
    } else if (this.num == 1) {
      this.service.setGradingSettings(0).subscribe(x=>{
        this.alertify.success("Vize Girişi Açık");
      });
    } else {
      this.service.setGradingSettings(1).subscribe(x=>{
        this.alertify.success("Final Girişi Açık");
      });
    }
  }

  change(){
    var dates=new InternShipDates();
    var startDate=this.fromDate.year+"-"+this.fromDate.month+"-"+this.fromDate.day;
    var finishDate=this.toDate.year+"-"+this.toDate.month+"-"+this.toDate.day;
    dates.startDate=new Date(startDate);
    dates.finishDate=new Date(finishDate);
    this.service.addDate(dates);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
}
