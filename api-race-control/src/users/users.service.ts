import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from './schemas/user.schema';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const userRecord = await admin.auth().getUser(createUserDto.userId).catch(() => {
      return null
    });
    if (!userRecord) return new NotFoundException('No firebase user account exist with this userId')

    const user = await this.userModel.findOne({
      userId: createUserDto.userId
    })

    if(user) return new BadRequestException('User already exists with this userId')

    return new this.userModel(createUserDto).save()
  }

  findAll() {
    return this.userModel.find().exec()
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id)
    if (!user) throw new NotFoundException()

    return user;
  }

  async findOneByUserId(userId: string) {
    return await this.userModel.findOne({ userId })
  }

  async getFirebaseProfileData(id: string) {
    const user = await this.userModel.findById(id)
    if (!user) throw new NotFoundException()

    const userRecord = await admin.auth().getUser(user.userId).catch(() => {
      return null
    });
    if (!userRecord) return new NotFoundException()

    const { uid, displayName, photoURL } = userRecord;

    return {
      uid,
      displayName: displayName || null,
      photoURL: photoURL || null,
    }
  }

  async addRaceControlPoints(id: string, amount: number) {
    const user = await this.userModel.findById(id);
    const raceControlPoints = user.raceControlPoints + amount;
    return this.userModel.findByIdAndUpdate(id, { $set: { raceControlPoints } });
  }
}
