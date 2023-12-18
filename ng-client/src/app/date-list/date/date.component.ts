import { Component, Input } from '@angular/core';
import { Meeting } from '../../shared/meeting.model';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent {
  @Input() meeting: Meeting;

  constructor(private dataService: DataService){}

  accept(){
    this.dataService.acceptMeeting(this.meeting);
  }
  decline(){
    this.dataService.declineMeeting(this.meeting);
  }
  onReschedule(){

  }
}
