import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type UserDocument = User & Document;

@Schema({
    timestamps: {
        createdAt: true,
        updatedAt: true,
    },
    toJSON: {
        virtuals: true,
    },
})
export class User {
    @ApiProperty()
    id: string;

    @Prop({ required: true, immutable: true, unique: true })
    @ApiProperty()
    userId: string;

    @Prop({ required: true, default: 0 })
    @ApiProperty()
    raceControlPoints: number = 0;

    @Prop({ required: true})
    @ApiProperty()
    name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);