import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CarsService } from 'src/cars/cars.service';
import { BearerGuard } from 'src/guards/bearer.guard';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly carsService: CarsService
  ) { }

  @Get(':id')
  @UseGuards(BearerGuard)
  @ApiBearerAuth('Bearer Authentication')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get(':id/cars')
  @UseGuards(BearerGuard)
  @ApiBearerAuth('Bearer Authentication')
  async getUserCars(@Param('id') userId: string) {
    return this.carsService.findByUserId(userId);
  }
}
