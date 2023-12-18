import { Body, Request, Controller, Get, HttpCode, HttpException, HttpStatus, Post, UseGuards, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser } from './create-user.dto';
import { AuthGuard } from './auth.authguard';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){  }

    @Post('signup')
    signup(@Body() createUser: CreateUser) {
        return this.authService.signup(createUser.email, createUser.password, createUser.name)
            .catch( (e) => {
                switch (e.code){
                    case 'P2002':
                        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
                        break;
                    default:
                        throw new HttpException('Unknown error', HttpStatus.BAD_REQUEST);
                }
                
            })
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginuser: CreateUser) {
        const user: User = await this.authService.validateUser(loginuser.email, loginuser.password)
        if (user)
            return this.authService.login(user)
    }

    @Get('ping')
    ping(@Request() req, @Param() param){
        console.log('Ping')
        console.log('Req: ', req.headers);
        console.log('Params: ', param);
        return {};
    }
}
