import { Injectable, resolveForwardRef } from '@angular/core';
import { Group } from './group.model';
import { Meeting } from './meeting.model';
import { Member } from './member.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { group } from '@angular/animations';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

interface GrpDTO {
  id: string; 
  name: string; 
  ImgLink: string; 
  users: {userID: string, groupID: string, isAdmin: boolean, user: UserDTO}[];
  schedules: ScheduleDTO[];
  meetings: MeetingDTO[];
}
interface UserDTO {
  id: string;
  userName: string;
  email: string;
  password: string
}
interface ScheduleDTO {
  id: string; 
  groupID: string;
  startDate: string;
  repeate: string;
}
interface MeetingDTO {
  id: string;
  date: Date
  groupID: string;
  rescheduled: boolean;
  reschedules: ReschedulesDTO[]
  members: MemberDTO[]
}
interface ReschedulesDTO {
  mainID: string;
  subID: string; 
  reschedule: MeetingDTO;
}
interface MemberDTO {
  userID: 'c9202215-427a-458a-b956-6c7e89eb929e';
  meetingID: '8ede0c6e-3f2d-450d-97cf-e63352d31985';
  accepted: 'accepted';
  user: UserDTO;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  endDate = new Date();
  //groups: Group[] = [];

  groups: Group[] = [
    new Group('Grp1', 'Test Group1', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyHrRWjgxU8DgFOGszvioOTR_TNGZuruM0zBGHNrc-QQ&s', [{id: 'testid', name: 'Mark', status: 'waiting'}, {id: 'testid', name: 'Jessy', status: 'waiting'}],
      [{startDate: new Date('11.01.2023 23:50'), repeate: 'weekly'}, {startDate: new Date('11.03.2023 02:00'), repeate: 'monthly'}],
      [
        {id: 'TestID1', grp: 'Test Group1', grpName: '', date: new Date('11.01.2023 23:50'), members: [{id: '', name: 'Mark', status: 'accepted'}, {id: '', name: 'Jessy', status: 'accepted'}, {id: '', name: 'Andreas', status: 'accepted'}], reschedules: [], rescheduled: false},
        {id: 'TestID2', grp: 'Test Group1', grpName: '', date: new Date('11.03.2023 23:50'), members: [{id: '', name: 'Mark', status: 'accepted'}, {id: '', name: 'Jessy', status: 'waiting'}, {id: '', name: 'Andreas', status: 'accepted'}], reschedules: [], rescheduled: false},
        {id: 'TestID3', grp: 'Test Group1', grpName: '', date: new Date('11.08.2023 23:50'), members: [{id: '', name: 'Andreas', status: 'waiting'}, {id: '', name: 'Jessy', status: 'accepted'}, {id: '', name: 'Mark', status: 'accepted'}], reschedules: [new Meeting('123', 'Test Group1','Test Group1', new Date('02.02.2023 18:00'), [{id: '', name: 'Mark', status: 'waiting'}, {id: '', name: 'Jessy', status: 'accepted'}, {id: '', name: 'Andreas', status: 'accepted'}], [], false, 'waiting') ], rescheduled: false},
        {id: 'TestID4', grp: 'Test Group1', grpName: '', date: new Date('11.29.2023 23:50'), members: [{id: '', name: 'Jessy', status: 'accepted'}, {id: '', name: 'Mark', status: 'accepted'}, {id: '', name: 'Andreas', status: 'accepted'}], reschedules: [], rescheduled: false}
      ]),
    new Group('Grp2', 'Test Group2', '', [{id: 'testid', name: 'Mark', status: 'waiting'}, {id: 'testid', name: 'Jessy', status: 'waiting'}],
      [{startDate: new Date('10.03.2023 03:00'), repeate: 'biWeekly'}],
      [
        {id: 'TestID5', grp: 'Test Group2', grpName: '', date: new Date('11.07.2023 19:00'), members: [{id: '', name: 'Jessy', status: 'accepted'}, {id: '', name: 'Mark', status: 'accepted'}, {id: '', name: 'Andreas', status: 'accepted'}], reschedules: [], rescheduled: false},
        {id: 'TestID6', grp: 'Test Group2', grpName: '', date: new Date('11.21.2023 19:00'), members: [{id: '', name: 'Jessy', status: 'accepted'}, {id: '', name: 'Mark', status: 'accepted'}, {id: '', name: 'Andreas', status: 'accepted'}], reschedules: [], rescheduled: false},
        {id: 'TestID7', grp: 'Test Group2', grpName: '', date: new Date('12.05.2023 19:00'), members: [{id: '', name: 'Jessy', status: 'accepted'}, {id: '', name: 'Mark', status: 'accepted'}, {id: '', name: 'Andreas', status: 'accepted'}], reschedules: [], rescheduled: false},
        {id: 'TestID8', grp: 'Test Group2', grpName: '', date: new Date('12.19.2023 19:00'), members: [{id: '', name: 'Jan', status: 'declined'}, {id: '', name: 'Jessy', status: 'waiting'}, {id: '', name: 'Andreas', status: 'accepted'},{id: '', name: 'Hans', status: 'declined'}, {id: '', name: 'Jessy', status: 'waiting'}, {id: '', name: 'Mark', status: 'accepted'}], reschedules: [], rescheduled: false},
        ])
  ]

  loadedMeetings: Meeting[] = [];
  meetings: Meeting[] = [];

  constructor(private http: HttpClient, private user: UserService){
    this.endDate.setDate(new Date().getDate() + 60);
  }

  async update(){
    // ToDo: pull data from server
    this.groups = [];
    this.loadedMeetings = [];
    // ToDo: This should be done in the login component
    await this.http.get(environment.SERVER + '/data/user')
      .subscribe( (resp:{email: string, id: string, userName: string}) => {
        this.user.id = resp.id;
        this.user.email = resp.email;
        this.user.username = resp.userName;
      })
    const resp = await lastValueFrom(this.http.get<GrpDTO[]>(environment.SERVER + '/data/groups'))
        for (let grp of resp){
          let newMembers: Member[] = grp.users.map( (mem):Member => {
            return {id: mem.userID, name: mem.user.userName, status: mem.isAdmin == true? 'admin' : 'user'}
          })
          let newMeetings = grp.meetings.map( (meet):Meeting => {
            let meetMembers: Member[] = meet.members.map( (mem):Member => {
              return {id: mem.userID, name: mem.user.userName, status: mem.accepted}
            })
            let reschedules = meet.reschedules.map( (resch):Meeting => {
              let meetMembers: Member[] = [];
                    meetMembers = resch.reschedule.members.map( (mem):Member => {  // Hier Fehler -> Member müssen aus anderem Meet kommen :S
                      return {id: mem.userID, name: mem.user.userName, status: mem.accepted}
                    })
              let retMeet = new Meeting(resch.subID, '', grp.name, new Date(resch.reschedule.date), meetMembers, [], false, resch.mainID);               
              return retMeet;
            })
            return new Meeting(meet.id, grp.id, grp.name, new Date(meet.date), meetMembers, reschedules, meet.rescheduled) // Grp.Name korrekt??????
          })
          let newSchedules = grp.schedules.map( (sched) => {
            return {startDate: new Date(sched.startDate), repeate: sched.repeate}
          })
          this.groups.push(new Group(grp.id, grp.name, grp.ImgLink, newMembers, newSchedules, newMeetings)      
          )
        }
    console.log('Groups:');
    console.log(this.groups);
    
    // Loads all the meetings from the groups, into the meetings variable
    for (let grp of this.groups)
      for (let meeting of grp.meetings)
        this.loadedMeetings.push(meeting);
      
    console.log('Loaded Meetings:');
    console.log(this.loadedMeetings)
  }

  updateMeetings(){
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    this.meetings = [];

    for (let iDate = new Date(today.getFullYear(), today.getMonth(), 1); iDate < this.endDate; iDate.setDate(iDate.getDate() + 1)){
      
      // Check if there is already a meeting at that date, then either add that meeting or create a new one
      let foundSchedule = this.loadedMeetings.find((element) => {
        return element.date.getFullYear() == iDate.getFullYear() && element.date.getMonth() == iDate.getMonth() && element.date.getDate() == iDate.getDate()
        });
      if (foundSchedule){
        this.meetings.push(foundSchedule);
      }
      else{
        for (let grp of this.groups){
          for (let schedules of grp.schedules){

            switch (schedules.repeate){
              case 'weekly':
                // Check if the date is behind the schedules creation date and if the weekday is the same
                if(+iDate + (24 * 60 * 60 * 1000) > +schedules.startDate && iDate.getDay() == schedules.startDate.getDay()){
                    this.meetings.push(new Meeting(
                      null,
                      grp.id,
                      grp.name, 
                      new Date(iDate.getFullYear(), iDate.getMonth(), iDate.getDate(), schedules.startDate.getHours(), schedules.startDate.getMinutes()), 
                      grp.getMembers(), 
                      [], 
                      false,
                      null, 
                      'waiting'))
                }
                break;
              case 'biWeekly':
                if(+iDate + (24 * 60 * 60 * 1000) > +schedules.startDate && iDate.getDay() == schedules.startDate.getDay() && Math.floor((+iDate - +schedules.startDate) / (7 * 24 * 60 * 60 * 1000)) % 2 === Math.floor(+schedules.startDate / (7 * 24 * 60 * 60 * 1000)) % 2){
                  this.meetings.push(new Meeting(
                    null,
                    grp.id,
                    grp.name, 
                    new Date(iDate.getFullYear(), iDate.getMonth(), iDate.getDate(), schedules.startDate.getHours(), schedules.startDate.getMinutes()), 
                    grp.getMembers(), 
                    [], 
                    false,
                    null, 
                    'waiting'))
                }
                break;
              case 'monthly':
                if(+iDate + (24 * 60 * 60 * 1000) > +schedules.startDate && iDate > schedules.startDate && iDate.getDay() == schedules.startDate.getDay() && iDate.getDate() < 7){
                  this.meetings.push(new Meeting(
                    null,
                    grp.id,
                    grp.name, 
                    new Date(iDate.getFullYear(), iDate.getMonth(), iDate.getDate(), schedules.startDate.getHours(), schedules.startDate.getMinutes()), 
                    grp.getMembers(), 
                    [], 
                    false, 
                    null,
                    'waiting'))
                }
                break;
            }
          }
        }
      }
    }
    this.meetings.sort((a, b) => (a.date > b.date) ? 1 : -1);
    for (let meeting of this.meetings){
      this.initMeeting(meeting);
    }
    console.log("Meetings: ", this.meetings)
  }

  addMeetings(dayCount?: number){
    if (dayCount)
      this.endDate.setDate(new Date().getDate() + dayCount);
    else
    this.endDate.setDate(new Date().getDate() + 30);

    this.updateMeetings();
  }

  updateMeeting(meeting: Meeting){
    let status = 'accepted';
    for (let member of meeting.members){
      if (member.status == 'waiting')
        status = 'waiting';
      else if (member.status == 'declined'){
        status = 'declined';
        break;
      }
    }
    meeting.state = status;
  }

  initMeeting(meeting: Meeting){
    // ToDo: Users with the same name will break this.
    // ToDo: Send information about changes to the server? Maybe some where else?
    let state;

    // sorts the user to the front for better visability
    let newMemberList: Member[] = [];
    for(let memberIndex in meeting.members){
      if (meeting.members[memberIndex].id === this.user.id){
        newMemberList = meeting.members.slice(+memberIndex);
        newMemberList = newMemberList.concat(meeting.members.slice(0, +memberIndex));
        meeting.members = newMemberList;
      }
    }
    for( let reschedule of meeting.reschedules)
      this.initMeeting(reschedule);
    
    this.updateMeeting(meeting);
  }

  getMeetingID(meeting: Meeting){
    return this.meetings.indexOf(meeting);
  }

  getGroup(groupName: string){
    for (let grp of this.groups)
      if (groupName === grp.name)
        return grp;
  }

  addMeeting(newMeeting: Meeting){
    for (let id in this.groups){
      if (this.groups[id].name == newMeeting.id)
        this.groups[id].meetings.push(newMeeting);
    }
    this.loadedMeetings.push(newMeeting)
    
  }

  acceptMeeting(meeting: Meeting){
    if (meeting.id){
      this.http.post(environment.SERVER + '/data/meeting/accept/' + meeting.id, null).subscribe({
        next: data => {
          console.log(data);
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })
      meeting.members[0].status = 'accepted';
      this.updateMeeting(meeting);
    }
    else{
      
    }
  }

  declineMeeting(meeting: Meeting){
    if (meeting.id){
      this.http.post(environment.SERVER + '/data/meeting/decline/' + meeting.id, null).subscribe({
        next: data => {
          console.log(data);
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })
    }
    else{

    }
    meeting.members[0].status = 'declined';
    this.updateMeeting(meeting);
  }

}
