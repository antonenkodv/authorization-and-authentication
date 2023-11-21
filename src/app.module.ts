import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@auth/auth';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [
    AuthModule.register({ AuthUserRepository: UserRepository }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
