import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

@Expose()
export class SignInDto {
  @IsEmail()
  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'test1234' })
  password: string;
}
