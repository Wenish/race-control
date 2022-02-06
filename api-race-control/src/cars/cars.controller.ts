import { Controller, Get, Post, Body, Param, Delete, NotFoundException, UseGuards, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { FirebaseUser, User } from 'src/decorators/user.decorator';
import { BearerGuard } from 'src/guards/bearer.guard';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
@ApiTags('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) { }

  @Post()
  //@UseGuards(BearerGuard)
  //@ApiBearerAuth('Bearer Authentication')
  @ApiBody({ type: CreateCarDto })
  create(
    @Body() createCarDto: CreateCarDto,
    @User() user: FirebaseUser,
  ) {
    return this.carsService.create(createCarDto);
  }

  @Get()
  //@UseGuards(BearerGuard)
  //@ApiBearerAuth('Bearer Authentication')
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  //@UseGuards(BearerGuard)
  //@ApiBearerAuth('Bearer Authentication')
  async findOne(@Param('id') id: string) {
    const car = await this.carsService.findOne(id);
    if (!car) throw new NotFoundException()
    return car;
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  //@UseGuards(BearerGuard)
  //@ApiBearerAuth('Bearer Authentication')
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }
}
