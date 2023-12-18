import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    // find the user by email
    const user: User = await this.prisma.user.findUnique({ where: { email } });

    if ( !user || !await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException();
    }
    // return the user without the password
    // const { password: _, ...result } = user;
    return user;
  }

  async login(user: User): Promise<{ access_token: string }> {
    // generate a JWT token with the user id as payload
    const payload = { sub: user.id };
    console.log('Login: ', payload.sub);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(
    email: string,
    password: string,
    userName: string,
  ): Promise<{ access_token: string }> {
    let exists = await this.prisma.user.findFirst({
        where:{
            email
        }
    })
    // the create function create a new ID befor throwing the error. This is to prevent that
    if (exists){ 
        throw {message: 'user already exists', code: 'P2002'};
    }
    // hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    // create a new user with the given data
    const user = await this.prisma.user.create({
      data: {
        userName,
        email,
        password: hashedPassword
      },
    });
    // return the login result
    return this.login(user);
  }
}

