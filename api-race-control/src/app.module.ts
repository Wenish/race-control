import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { CarsModule } from './cars/cars.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { BearerStrategy } from './guards/bearer.guard';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    DatabaseModule,
    AuthenticationModule,
    CarsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, BearerStrategy],
})
export class AppModule {}
