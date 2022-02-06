import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './schemas/car.schema';
import { CarDocument } from './schemas/car.schema';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car.name)
    private carModel: Model<CarDocument>
  ) { }

  create(createCarDto: CreateCarDto, userId: string) {
    return new this.carModel({
      ...createCarDto,
      user: userId
    }).save()
  }

  findAll() {
    return this.carModel.find()
  }

  findOne(id) {
    return this.carModel.findById(id)
  }

  findByUserId(userId) {
    console.log(userId)
    return this.carModel.find({
      user: new Types.ObjectId(userId)
    });
  }

  remove(id) {
    return this.carModel.findByIdAndDelete(id)
  }
}
