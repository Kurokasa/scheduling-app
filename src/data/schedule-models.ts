export class Group {
    
    constructor(
        public id: string,
        public name: string,
        public imgLink: string, 
        public members: Member[] = [],   
        public schedules: {startDate: Date, repeat: string}[],  // repeat -> none, weekly, biWeekly, monthly
        public meetings: Meeting[],       
    ) {}
}

export class Meeting{
    
    constructor(
        public id: string, // new
        public grp: string,
        public date: Date,
        public members: Member[],
        public reschedules: Meeting[] = [],
        public rescheduled: Boolean = false,
        public mainschedule?: string,  // new
        public state?: string
    ) {}
}

export interface Member{
    
        id: string;
        name: string;
        status: string;
}
