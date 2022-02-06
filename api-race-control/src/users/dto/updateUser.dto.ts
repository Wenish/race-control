import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

@Expose()
export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;
}
