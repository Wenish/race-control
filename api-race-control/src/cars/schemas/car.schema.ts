import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { User } from "../../users/schemas/user.schema";

export type CarDocument = Car & Document;

@Schema({
    timestamps: {
        createdAt: true,
        updatedAt: true,
    },
    toJSON: {
        virtuals: true,
    },
})
export class Car {
    @ApiProperty()
    id: string;

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user: Types.ObjectId

    @Prop({ default: 'Car Name', required: true })
    name: string;

    @Prop(raw({
        power: { type: Number, default: 1000 },
        consumption: { type: Number, default: 10 },
        weight: { type: Number, default: 200 },
        currentHealth: { type: Number, default: 1000 },
        maxHealth: { type: Number, default: 1000 },
    }))
    engine: Record<number, any>;

    @Prop(raw({
        currentLoad: { type: Number, default: 100 },
        maxLoad: { type: Number, default: 100 },
        weight: { type: Number, default: 10 },
        currentHealth: { type: Number, default: 10000 },
        maxHealth: { type: Number, default: 10000 },
    }))
    fuelTank: Record<number, any>;

    @Prop(raw({
        power: { type: Number, default: 5 },
        weight: { type: Number, default: 12 },
        currentHealth: { type: Number, default: 1000 },
        maxHealth: { type: Number, default: 1000 },
    }))
    brakes: Record<number, any>;

    @Prop(raw({
        downForce: { type: Number, default: 3 },
        weight: { type: Number, default: 10 },
        currentHealth: { type: Number, default: 1000 },
        maxHealth: { type: Number, default: 1000 },
    }))
    rearWing: Record<number, any>;

    @Prop(raw({
        downForce: { type: Number, default: 3 },
        weight: { type: Number, default: 10 },
        currentHealth: { type: Number, default: 1000 },
        maxHealth: { type: Number, default: 1000 },
    }))
    frontWing: Record<number, any>;
}

export const CarSchema = SchemaFactory.createForClass(Car);