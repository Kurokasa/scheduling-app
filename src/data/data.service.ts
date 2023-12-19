import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Group, Meeting, Member } from './schedule-models';

@Injectable()
export class DataService {

    constructor(private prismaService: PrismaService){}

    async checkUser(userID: string, groupID: string){
        await this.prismaService.users.findFirstOrThrow({
            where: {
                groupID,
                userID
            }
        }).catch( (reason)=>{
            throw new HttpException('Unauthoriued', 401)
        })
        return true;
    }
    // returns an array of all groups the userID is part of
    async getGroups(userID){

        let groups = await this.prismaService.group.findMany({
            include: {
                users: {
                    include: {
                        user: true
                    },
                    
                },
                schedules: true,
                meetings: {
                    include: {
                        members: {
                            include: {
                                user: true
                            }
                        },
                        reschedules: {
                            include: {
                                reschedule: {
                                    include: {
                                        members: {
                                            include: {
                                                user: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            where: {
                users: {
                    some: {
                        userID
                    }
                }
            }
        })
        return groups;
    }
    // creates a new grp with the userID a admin, return the new group
    async postGroup(userID: any, grp: Group){
        console.log(grp)
        const newGrp = await this.prismaService.group.create({
            data:{
                name: grp.name,
                imgLink: grp.imgLink,
            }
        })
        await this.prismaService.users.create({
            data:{
                userID,
                groupID: newGrp.id,
                isAdmin: true
            }
        })
        return newGrp;       
    }
    // creates a new meeting, return the new meeting
    // ToDo: check if the user is part of the group
    async postMeeting(userID: any, meet: Meeting){
        await this.checkUser(userID, meet.grp);

        const newMeeting = await this.prismaService.meeting.create({
            data:{
                date: meet.date,
                groupID: meet.grp,
            }
        })
        let members = (await this.prismaService.users.findMany({
            where:{
                groupID: meet.grp
            }
        })).map( (mem) => mem.userID)
        for (let id of members){
            await this.prismaService.members.create({
                data: {
                    userID: id,
                    meetingID: newMeeting.id
                }
            })
        }
        if(meet.mainschedule){
            await this.prismaService.reschedules.create({
                data:{
                    mainID: meet.mainschedule,
                    subID: newMeeting.id
                }
            })
        }
        return newMeeting;
    }
    // return the user of the id without the password
    async getUser(id){
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                userName: true,
                email: true,
            }
        })
        return user;
    }
    // creates a new uhg entry for the user and grp, return the joined group
    async joinGroup(userID: any, groupID: any){
        let grp = await this.prismaService.group.findUnique({
            where: {
                id: groupID
            }
        })
        let user = await this.prismaService.user.findUnique({
            where: {
                id: userID
            }
        })
        if(!grp)
            throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
        if(!user)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        
        await this.prismaService.users.create({
            data: {
                userID,
                groupID
            }
            }).catch( (err) => {
                switch(err.code){
                    default:
                        console.log('Unknown Error in joinGroup() ', err);
                        throw new HttpException('Unknown Error in Grp join', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            })
        return grp;  
    }

    async leaveGroup(userID: any, groupID: any){
        let grp = await this.prismaService.group.findUnique({
            where: {
                id: groupID
            }
        })
        if(!grp)
            throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
        
        await this.prismaService.users.delete({
            where: {
                userID_groupID: {
                    userID,
                    groupID
                }
            }
            }).catch( (err) => {
                switch(err.code){
                    case 'P2001':
                        throw new HttpException('User not in Group', HttpStatus.BAD_REQUEST);
                        break;
                    default:
                        console.log('Unknown Error in leaveGroup() ', err);
                        throw new HttpException('Unknown Error in Grp leave', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            })
        return grp;  
    }

    async updateGroup(userID: any, grp: Group){
        console.log(grp)
        let group = await this.prismaService.group.findUnique({
            where: {
                id: grp.id
            }
        })
        if(!group)
            throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
        
        await this.prismaService.group.update({
            where: {
                id: grp.id
            },
            data: {
                name: grp.name,
                imgLink: grp.imgLink
            }
            }).catch( (err) => {
                switch(err.code){
                    default:
                        console.log('Unknown Error in updateGroup() ', err);
                        throw new HttpException('Unknown Error in Grp update', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            })
        return group;
    }

    async acceptMeeting(userID: any, meetingID: any){
        let meeting = await this.prismaService.meeting.findUnique({
            where: {
                id: meetingID
            }
        })
        if(!meeting)
            throw new HttpException('Meeting not found', HttpStatus.NOT_FOUND);
        
        await this.prismaService.members.update({
            where: {
                userID_meetingID: {
                    userID,
                    meetingID
                }
            },
            data: {
                accepted: 'accepted'
            }
            }).catch( (err) => {
                switch(err.code){
                    case 'P2001':
                        throw new HttpException('User not in this Meeting', HttpStatus.BAD_REQUEST);
                        break;
                    default:
                        console.log('Unknown Error in acceptMeeting() ', err);
                        throw new HttpException('Unknown Error in Meeting accept', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            })
        return meeting;  
    }

    async declineMeeting(userID: any, meetingID: any){
        let meeting = await this.prismaService.meeting.findUnique({
            where: {
                id: meetingID
            }
        })
        if(!meeting)
            throw new HttpException('Meeting not found', HttpStatus.NOT_FOUND);
        
        await this.prismaService.members.update({
            where: {
                userID_meetingID: {
                    userID,
                    meetingID
                }
            },
            data: {
                accepted: 'declined'
            }
            }).catch( (err) => {
                switch(err.code){
                    case 'P2001':
                        throw new HttpException('User not in this Meeting', HttpStatus.BAD_REQUEST);
                        break;
                    default:
                        console.log('Unknown Error in declineMeeting() ', err);
                        throw new HttpException('Unknown Error in Meeting decline', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            })
        return meeting;  
    }
}
