import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsModule } from 'src/cars/cars.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CarsModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
