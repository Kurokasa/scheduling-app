import { Meeting } from "./meeting.model";
import { Member } from "./member.model";

export class Group {
    
    constructor(
        public id: string,
        public name: string,
        public imgLink: string, 
        public members: Member[] = [],   
        public schedules: {startDate: Date, repeat: string}[],  // repeat -> none, weekly, biWeekly, monthly
        public meetings: Meeting[]        
    ) {}

    getMembers(): Member[]{
        return this.members.map( (member) => {
            return {id: member.id, name: member.name, status: 'waiting'}
        })
    }
}