import { Controller, Get, Post, Body, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { FirebaseUser, User } from 'src/decorators/user.decorator';
import { BearerGuard } from 'src/guards/bearer.guard';
import { ObjectID } from 'typeorm';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './entities/car.entity';

@Controller('cars')
@ApiTags('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) { }

  @Post()
  @UseGuards(BearerGuard)
  @ApiBearerAuth('Bearer Authentication')
  @ApiBody({ type: CreateCarDto })
  create(
    @Body() createCarDto: CreateCarDto,
    @User() user: FirebaseUser,
  ) {
    const car = {
      ...new Car(),
      ...createCarDto
    }
    return this.carsService.create(car, user.uid);
  }

  @Get()
  @UseGuards(BearerGuard)
  @ApiBearerAuth('Bearer Authentication')
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  @UseGuards(BearerGuard)
  @ApiBearerAuth('Bearer Authentication')
  async findOne(@Param('id') id: ObjectID) {
    const car = await this.carsService.findOne(id);
    if (!car) throw new NotFoundException()
    return car;
  }

  @Delete(':id')
  @UseGuards(BearerGuard)
  @ApiBearerAuth('Bearer Authentication')
  remove(@Param('id') id: ObjectID) {
    return this.carsService.remove(id);
  }
}
