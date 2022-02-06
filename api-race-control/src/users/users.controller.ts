import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CarsService } from 'src/cars/cars.service';
import { BearerGuard } from 'src/guards/bearer.guard';
import { ParseObjectIdPipe } from 'src/pipes/parseObjectId.pipe';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
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
  //@ApiBearerAuth('Bearer Authentication')
  getOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get(':id/profile')
  //@UseGuards(BearerGuard)
  //@ApiBearerAuth('Bearer Authentication')
  getOneProfile(@Param('id') id: string) {
    return this.usersService.getFirebaseProfileData(id);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Get(':id/cars')
  //@UseGuards(BearerGuard)
  //@ApiBearerAuth('Bearer Authentication')
  async getUserCars(@Param('id', new ParseObjectIdPipe()) userId: string) {
    return this.carsService.findByUserId(userId);
  }
}
