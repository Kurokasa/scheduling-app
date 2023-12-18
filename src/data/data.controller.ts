import { Request, Body, Controller, Get, UseGuards, Post, Param } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.authguard';
import { DataService } from './data.service';
import { Group, Meeting } from './schedule-models';

@Controller('data')
export class DataController {

    constructor(private dataService: DataService){}

    @UseGuards(AuthGuard)
    @Get('groups')
    getGroups(@Request() req){
        return this.dataService.getGroups(req['user'].sub)
    }
    @UseGuards(AuthGuard)
    @Post('newGroup')
    postGroup(@Request() req, @Body() grp: Group){
        return this.dataService.postGroup(req['user'].sub, grp)
    }
    @UseGuards(AuthGuard)
    @Post('newMeeting')
    postMeeting(@Request() req, @Body() meet: Meeting){
        return this.dataService.postMeeting(req['user'].sub, meet)
    }
    @UseGuards(AuthGuard)
    @Get('user')
    getUser(@Request() req){
        return this.dataService.getUser(req['user'].sub)
    }
    @UseGuards(AuthGuard)
    @Post('join/:id')
    joinGroup(@Request() req, @Param() grp){
        return this.dataService.joinGroup(req['user'].sub, grp.id)
    }
    @UseGuards(AuthGuard)
    @Post('meeting/accept/:id')
    acceptMeeting(@Request() req, @Param() meet){
        return this.dataService.acceptMeeting(req['user'].sub, meet.id)
    }
    @UseGuards(AuthGuard)
    @Post('meeting/decline/:id')
    declineMeeting(@Request() req, @Param() meet){
        return this.dataService.declineMeeting(req['user'].sub, meet.id)
    }
}
