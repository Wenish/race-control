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

  async findOne(id: string) {
    try {
      const { uid, displayName, photoURL } = await admin.auth().getUser(id);
      return {
        uid,
        displayName: displayName || null,
        photoURL: photoURL || null
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
