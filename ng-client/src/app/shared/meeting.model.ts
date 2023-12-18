import { Member } from "./member.model";

export class Meeting{
    
    constructor(
        public id: string, // new
        public grp: string,
        public grpName: string,
        public date: Date,
        public members: Member[],
        public reschedules: Meeting[] = [],
        public rescheduled: Boolean = false,
        public mainschedule?: string,  // new
        public state?: string
    ) {}
}