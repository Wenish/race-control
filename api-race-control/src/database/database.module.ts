import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/cars/entities/car.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('database.uri'),
        useUnifiedTopology: true,
        useNewUrlParser: true,
        entities: [
            Car,
            User
        ],
        ssl: true
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}