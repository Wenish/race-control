import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('database.uri'),
        useUnifiedTopology: true,
        useNewUrlParser: true,
        ssl: true
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}