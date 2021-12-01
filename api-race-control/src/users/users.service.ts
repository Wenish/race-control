import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './entities/user.entity';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: MongoRepository<User>,
  ) { }

  async findOne(userId: string) {
    try {
      const user = await this.findOrCreateUser(userId)
      const { uid, displayName, photoURL } = await admin.auth().getUser(userId);
      return {
        uid,
        displayName: displayName || null,
        photoURL: photoURL || null,
        ...user
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async addRaceControlPoints(userId: string, amount: number) {
    const user = await this.findOrCreateUser(userId)
    user.raceControlPoints = user.raceControlPoints + amount;
    return this.usersRepository.save(user)
  }

  async findOrCreateUser(userId: string) {
    const user = await this.usersRepository.findOne({
      userId
    })

    if(!!user) return user;

    const newUser = new User()
    newUser.userId = userId

    return this.usersRepository.save(newUser)
  }
}
