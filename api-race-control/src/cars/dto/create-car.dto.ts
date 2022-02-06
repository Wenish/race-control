import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

@Expose()
export class CreateCarDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({default: 'Car Name'})
    name: string;

    @IsNotEmpty()
    @ApiProperty({default: '61fffd03c6bfacf180d3a43f'})
    @Type(() => Types.ObjectId)
    @Transform(obj => {
        const validObjectId = Types.ObjectId.isValid(obj.value);

        if (!validObjectId) {
            throw new BadRequestException('Invalid ObjectId');
        }
  
      return new Types.ObjectId(obj.value);
    })
    user: string;
}
