import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CarsService } from 'src/cars/cars.service';
import { BearerGuard } from 'src/guards/bearer.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly carsService: CarsService
  ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  getAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  //@UseGuards(BearerGuard)
  @ApiBearerAuth('Bearer Authentication')
  getOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get(':id/profile')
  //@UseGuards(BearerGuard)
  @ApiBearerAuth('Bearer Authentication')
  getOneProfile(@Param('id') id: string) {
    return this.usersService.getFirebaseProfileData(id);
  }

  @Get(':id/cars')
  //@UseGuards(BearerGuard)
  @ApiBearerAuth('Bearer Authentication')
  async getUserCars(@Param('id') userId: string) {
    return this.carsService.findByUserId(userId);
  }
}
