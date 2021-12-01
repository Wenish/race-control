import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { StoreController } from './store.controller';

@Module({
  imports: [UsersModule],
  controllers: [StoreController]
})
export class StoreModule {}
