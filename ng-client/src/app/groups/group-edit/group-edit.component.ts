import { Component, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../../shared/group.model';
import { DataService } from '../../shared/data.service';
import { environment } from '../../../environments/environment';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit{
  @ViewChildren('calendar') datePicker;
  @Input() group: Group;
  isAdmin = false;
  date: Date;
  joinLink = environment.FRONTEND + '/group/join/';
  repeatOptions = ['none', 'weekly', 'biWeekly', 'monthly'];

  constructor(private dataService: DataService, private user: UserService) {}

  ngOnInit(): void {
    this.joinLink = this.joinLink + this.group.id;
    this.group.members.forEach(member => {
      if (member.status === 'admin' && member.id === this.user.id)
        this.isAdmin = true;
    });
  }

  copyLink(text){
    console.log(text);
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  leaveGroup(){
    if (this.isAdmin)
      this.dataService.deleteGroup(this.group.id);
    else
      this.dataService.leaveGroup(this.group.id);
  }

  save(){
    if (this.group.name !== '' && this.group.id)
      this.dataService.updateGroup(this.group);
    else if (this.group.name !== '' && !this.group.id)
      this.dataService.createGroup(this.group);
  }
  newSchedule(){
    this.group.schedules.push({startDate: new Date(), repeat: 'none'});
  }

  editSchedule(schedule: {startDate: Date, repeat: string}, index: number){
    this.date = this.datePicker.toArray()[index].value;
    this.date.setMilliseconds(0);
    this.date.setSeconds(0);
    console.log(this.date);
    this.datePicker.toArray()[index].overlayVisible = false;
    schedule.startDate = this.date;
  }

  delSchedule(schedule: {startDate: Date, repeat: string}){
    let si = this.group.schedules.findIndex(grpSchedule => grpSchedule.startDate == schedule.startDate);
    this.group.schedules.splice(si, 1);
  }
}
