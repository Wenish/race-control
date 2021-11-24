import { Controller, Get, Post, Body, Param, Delete, NotFoundException } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ObjectID } from 'typeorm';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './entities/car.entity';

@Controller('cars')
@ApiTags('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @ApiBody({ type: CreateCarDto })
  create(@Body() createCarDto: CreateCarDto) {
    const car = {
      ...new Car(),
      ...createCarDto
    }
    return this.carsService.create(car);
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: ObjectID) {
    const car = await this.carsService.findOne(id);
    if(!car) throw new NotFoundException()
    return car;
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectID) {
    return this.carsService.remove(id);
  }
}
