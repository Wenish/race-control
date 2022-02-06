import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { CarsModule } from './cars/cars.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { BearerStrategy } from './guards/bearer.guard';
import { UsersModule } from './users/users.module';
import { StoreModule } from './store/store.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.mongodb.uri'),
        dbName: configService.get<string>('database.mongodb.name'),
      }),
      inject: [ConfigService],
    }),
    AuthenticationModule,
    CarsModule,
    UsersModule,
    StoreModule,
  ],
  controllers: [AppController],
  providers: [AppService, BearerStrategy],
})
export class AppModule {}
