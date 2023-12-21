import { Injectable } from '@angular/core';
import { Group } from './group.model';
import { Meeting } from './meeting.model';
import { Member } from './member.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Subscription, lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

interface GrpDTO {
  id: string; 
  name: string; 
  imgLink: string; 
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
  userID: string;
  meetingID: string;
  accepted: string;
  user: UserDTO;
}

@Injectable({
  providedIn: 'root'
})
export class DataService{

  endDate = new Date();
  groups: Group[] = [];

  // groups: Group[] = [
  //   new Group('Grp1', 'Test Group1', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyHrRWjgxU8DgFOGszvioOTR_TNGZuruM0zBGHNrc-QQ&s', [{id: 'testid', name: 'Mark', status: 'waiting'}, {id: 'testid', name: 'Jessy', status: 'waiting'}],
  //     [{startDate: new Date('11.01.2023 23:50'), repeate: 'weekly'}, {startDate: new Date('11.03.2023 02:00'), repeate: 'monthly'}],
  //     [
  //       {id: 'TestID1', grp: 'Test Group1', grpName: '', date: new Date('11.01.2023 23:50'), members: [{id: '', name: 'Mark', status: 'accepted'}, {id: '', name: 'Jessy', status: 'accepted'}, {id: '', name: 'Andreas', status: 'accepted'}], reschedules: [], rescheduled: false},
  //       {id: 'TestID2', grp: 'Test Group1', grpName: '', date: new Date('11.03.2023 23:50'), members: [{id: '', name: 'Mark', status: 'accepted'}, {id: '', name: 'Jessy', status: 'waiting'}, {id: '', name: 'Andreas', status: 'accepted'}], reschedules: [], rescheduled: false},
  //       {id: 'TestID3', grp: 'Test Group1', grpName: '', date: new Date('11.08.2023 23:50'), members: [{id: '', name: 'Andreas', status: 'waiting'}, {id: '', name: 'Jessy', status: 'accepted'}, {id: '', name: 'Mark', status: 'accepted'}], reschedules: [new Meeting('123', 'Test Group1','Test Group1', new Date('02.02.2023 18:00'), [{id: '', name: 'Mark', status: 'waiting'}, {id: '', name: 'Jessy', status: 'accepted'}, {id: '', name: 'Andreas', status: 'accepted'}], [], false, 'waiting') ], rescheduled: false},
  //       {id: 'TestID4', grp: 'Test Group1', grpName: '', date: new Date('11.29.2023 23:50'), members: [{id: '', name: 'Jessy', status: 'accepted'}, {id: '', name: 'Mark', status: 'accepted'}, {id: '', name: 'Andreas', status: 'accepted'}], reschedules: [], rescheduled: false}
  //     ]),
  //   new Group('Grp2', 'Test Group2', '', [{id: 'testid', name: 'Mark', status: 'waiting'}, {id: 'testid', name: 'Jessy', status: 'waiting'}],
  //     [{startDate: new Date('10.03.2023 03:00'), repeate: 'biWeekly'}],
  //     [
  //       {id: 'TestID5', grp: 'Test Group2', grpName: '', date: new Date('11.07.2023 19:00'), members: [{id: '', name: 'Jessy', status: 'accepted'}, {id: '', name: 'Mark', status: 'accepted'}, {id: '', name: 'Andreas', status: 'accepted'}], reschedules: [], rescheduled: false},
  //       {id: 'TestID6', grp: 'Test Group2', grpName: '', date: new Date('11.21.2023 19:00'), members: [{id: '', name: 'Jessy', status: 'accepted'}, {id: '', name: 'Mark', status: 'accepted'}, {id: '', name: 'Andreas', status: 'accepted'}], reschedules: [], rescheduled: false},
  //       {id: 'TestID7', grp: 'Test Group2', grpName: '', date: new Date('12.05.2023 19:00'), members: [{id: '', name: 'Jessy', status: 'accepted'}, {id: '', name: 'Mark', status: 'accepted'}, {id: '', name: 'Andreas', status: 'accepted'}], reschedules: [], rescheduled: false},
  //       {id: 'TestID8', grp: 'Test Group2', grpName: '', date: new Date('12.19.2023 19:00'), members: [{id: '', name: 'Jan', status: 'declined'}, {id: '', name: 'Jessy', status: 'waiting'}, {id: '', name: 'Andreas', status: 'accepted'},{id: '', name: 'Hans', status: 'declined'}, {id: '', name: 'Jessy', status: 'waiting'}, {id: '', name: 'Mark', status: 'accepted'}], reschedules: [], rescheduled: false},
  //       ])
  // ]

  loadedMeetings: Meeting[] = [];
  meetings: Meeting[] = [];

  constructor(private http: HttpClient, private user: UserService, private router: Router) {
    this.endDate.setDate(new Date().getDate() + 60);
    if (this.user.jwt){
      this.update();
    }
  }

  async update(){
    this.groups = [];
    this.loadedMeetings = [];

    await this.http.get(environment.SERVER + '/data/user')
      .subscribe({
        next: resp => { 
          this.user.id = resp['id'];
          this.user.email = resp['email'];
          this.user.username = resp['userName'];},
        error: error => {
          if(error.error.message == 'Unauthorized')
            this.user.logout();
          else
            console.error('There was an error!', error);
        }
      })


      //   (resp:{email: string, id: string, userName: string}) => {
      //   this.user.id = resp.id;
      //   this.user.email = resp.email;
      //   this.user.username = resp.userName;
      // })
    
    const resp = await lastValueFrom(this.http.get<GrpDTO[]>(environment.SERVER + '/data/groups')).catch((error) => {
      if(error.error.message == 'Unauthorized')
        this.user.logout();
      else
        console.error('There was an error!', error);
      return [];
    });
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
          this.groups.push(new Group(grp.id, grp.name, grp.imgLink, newMembers, newSchedules, newMeetings)      
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
    this.updateMeetings();
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

  getGroup(groupId: string){
    for (let grp of this.groups)
      if (groupId === grp.id)
        return grp;
  }

  createGroup(newGroup: Group){
    this.http.post(environment.SERVER + '/data/createGroup', newGroup).subscribe({
      next: data => {
        console.log('Group created: ', data);
      },
      error: error => {
        if(error.error.message == 'Unauthorized'){
          this.user.logout();
          
        }
        else
          console.error('There was an error!', error);
      }
    })
    this.update();
  }

  leaveGroup(groupId: string){
    this.http.post(environment.SERVER + '/data/leave/' + groupId, null).subscribe({
      next: data => {
        console.log('Group left: ', data);
      },
      error: error => {
        if(error.error.message == 'Unauthorized'){
          this.user.logout();
          
        }
        else
          console.error('There was an error!', error);
      }
    })
    this.update();
  }

  deleteGroup(groupId: string){
    this.http.post(environment.SERVER + '/data/deleteGroup/' + groupId, null).subscribe({
      next: data => {
        console.log('Group deleted: ', data);
      },
      error: error => {
        if(error.error.message == 'Unauthorized'){
          this.user.logout();
          
        }
        else
          console.error('There was an error!', error);
      }
    })
    this.update();
  }

  updateGroup(group: Group){
    this.http.post(environment.SERVER + '/data/updateGroup', group).subscribe({
      next: data => {
        console.log('Group updated: ', data);
      },
      error: error => {
        if(error.error.message == 'Unauthorized'){
          this.user.logout();
          
        }
        console.error('There was an error!', error);
      }
    })
  }

  async addMeeting(newMeeting: Meeting): Promise<Meeting>{
    let userInGroup = this.groups.find((group) => group.id === newMeeting.grp);
    let isNewMeeting = !this.loadedMeetings.find((meeting) => meeting.date === newMeeting.date)
    if (userInGroup && isNewMeeting){
      return new Promise((resolve, reject) => {
        this.http.post(environment.SERVER + '/data/newMeeting', newMeeting)
          .subscribe({
            next: response => {
              console.log('addMeeting: ', response);
              newMeeting.id = response['id'];
              resolve(newMeeting);
            },
            error: error => {
              if(error.error.message == 'Unauthorized'){
                this.user.logout();
                
              }
              else{
                console.error('There was an error!', error);
                reject(error);
              }
            } 
          })
      });
    }
    throw new Error('User is not in the group or meeting already exists');
  }

  async acceptMeeting(meeting: Meeting){
    if (meeting.id){
      this.http.post(environment.SERVER + '/data/meeting/accept/' + meeting.id, null).subscribe({
        next: data => {
          console.log('acceptMeeting: ', data);
        },
        error: error => {
          if(error.error.message == 'Unauthorized')
            this.user.logout();
          else
            console.error('There was an error!', error);
        }
      })
      meeting.members[0].status = 'accepted';
      this.updateMeeting(meeting);
    }
    else{
      meeting = await this.addMeeting(meeting);
      this.http.post(environment.SERVER + '/data/meeting/accept/' + meeting.id, null).subscribe({
        next: data => {
          console.log('acceptMeeting: ', data);
        },
        error: error => {
          if(error.error.message == 'Unauthorized')
            this.user.logout();
          else
            console.error('There was an error!', error);
        }
      })
      meeting.members[0].status = 'accepted';
      this.updateMeeting(meeting);  
    }
  }

  async declineMeeting(meeting: Meeting){
    if (meeting.id){
      this.http.post(environment.SERVER + '/data/meeting/decline/' + meeting.id, null).subscribe({
        next: data => {
          console.log('declineMeeting: ', data);
        },
        error: error => {
          if(error.error.message == 'Unauthorized')
            this.user.logout();
          else
            console.error('There was an error!', error);
        }
      })
    }
    else{
      meeting = await this.addMeeting(meeting);
      this.http.post(environment.SERVER + '/data/meeting/decline/' + meeting.id, null).subscribe({
        next: data => {
          console.log('declineMeeting: ', data);
        },
        error: error => {
          if(error.error.message == 'Unauthorized')
            this.user.logout();
          else
            console.error('There was an error!', error);
        }
      })
    }
    meeting.members[0].status = 'declined';
    this.updateMeeting(meeting);
  }


}
