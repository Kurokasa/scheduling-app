import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{

  date: Date;
  de: any;
  constructor (public dataService: DataService, private primengConfig: PrimeNGConfig) {
    this.de = {
      firstDayOfWeek: 1,
      dayNames: [ "Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag" ],
      dayNamesShort: [ "So","Mo","Di","Mi","Do","Fr","Sa" ],
      dayNamesMin: [ "So","Mo","Di","Mi","Do","Fr","Sa" ],
      monthNames: [ "Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember" ],
      monthNamesShort: [ "Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez" ],
      today: 'Heute',
      clear: 'Clear'
    }
  }

  ngOnInit(): void {
    this.primengConfig.setTranslation(this.de);
  }

  isInDates(day: number, month: number, year: number){
    for (let meeting of this.dataService.meetings){
      if (day == meeting.date.getDate() && month == meeting.date.getMonth() && year == meeting.date.getFullYear()){
        return meeting.state;
      }
    }
    return '';
  }
  monthChanged(event: any){
    if(this.dataService.meetings[this.dataService.meetings.length - 1].date < new Date(event.year, event.month, 31))
      this.dataService.addMeetings();
  }
  selected(){
    // Prevents brocken primeNG highleights.
    this.date = new Date();
  }
}
