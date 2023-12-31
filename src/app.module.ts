import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { DataService } from './data/data.service';
import { DataController } from './data/data.controller';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [AuthController, DataController],
  providers: [AuthService, DataService],
})
export class AppModule {}
