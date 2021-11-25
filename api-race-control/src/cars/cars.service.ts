import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carsRepository: MongoRepository<Car>,
  ) { }

  create(createCarDto: CreateCarDto, userId: string) {
    return this.carsRepository.save({
      ...createCarDto,
      userId
    })
  }

  findAll() {
    return this.carsRepository.find()
  }

  findOne(id: ObjectID) {
    return this.carsRepository.findOne(id)
  }

  findByUserId(userId: string) {
    return this.carsRepository.find({
      where: {
        creator: userId,
      },
      order: {
        name: 'ASC',
      },
    });
  }

  remove(id: ObjectID) {
    return this.carsRepository.delete(id)
  }
}
