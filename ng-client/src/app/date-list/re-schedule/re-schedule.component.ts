import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meeting } from '../../shared/meeting.model';
import { Member } from '../../shared/member.model';

@Component({
  selector: 'app-re-schedule',
  templateUrl: './re-schedule.component.html',
  styleUrls: ['./re-schedule.component.css']
})
export class ReScheduleComponent implements OnInit{

  @ViewChild('calendar') datePicker;
  meeting: Meeting;
  reschedules: Meeting[] = [];
  date: Date;
  selectedMeeting: Meeting;
  overlay: boolean = false;

  constructor(public dataService: DataService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.meeting = this.dataService.meetings[+params.id];
      this.reschedules = this.meeting.reschedules;
      console.log('My Reschedules: ', this.reschedules)
    })
    this.date = this.meeting.date;
  }

  createReschedule(){
    this.datePicker.overlayVisible = false;
    let newMembers: Member[] = [];
    for (let mem of this.meeting.members)
      newMembers.push({id: mem.id, name: mem.name, status: 'waiting'})

    let newMeeting = new Meeting(null, this.meeting.grp, this.meeting.grpName, this.date, newMembers, [], false, this.meeting.id, 'waiting') //<Meeting>{id: null, grp: this.meeting.name, date: this.date, members: newMembers, reschedules: [], rescheduled: false, mainschedule: this.meeting.id, state: 'waiting'};
    // ToDo sync data to the server
    this.meeting.reschedules.push(newMeeting);
    this.meeting.reschedules.sort((a, b) => (a.date > b.date) ? 1 : -1);
  }
  accept(meeting: Meeting){
    meeting.members[0].status = 'accepted';
    this.dataService.updateMeeting(meeting);
  }
  decline(meeting: Meeting){
    meeting.members[0].status = 'declined';
    this.dataService.updateMeeting(meeting);
  }
  reschedule(event: boolean){
    if (event){
      this.meeting.rescheduled = true;
      this.dataService.addMeeting(this.selectedMeeting);
      this.dataService.updateMeetings();
      this.router.navigate(['/list']);
    }
    this.overlay = false;
  }
}
