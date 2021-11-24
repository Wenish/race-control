import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity('cars')
export class Car {
    @ObjectIdColumn() id: ObjectID;

    @Column()
    userId: string = 'test';

    @Column()
    name: string = 'Car Name'

    @Column()
    engine: {
        power: number,
        consumption: number,
        weight: number,
        currentHealth: number,
        maxHealth: number
    } = {
        power: 1000,
        consumption: 10,
        weight: 200,
        currentHealth: 1000,
        maxHealth: 1000
    }

    @Column()
    fuelTank: {
        currentLoad: number,
        maxLoad: number,
        weight: number,
        currentHealth: number,
        maxHealth: number
    } = {
        currentLoad: 100,
        maxLoad: 100,
        weight: 10,
        currentHealth: 10000,
        maxHealth: 10000
    }

    @Column()
    brakes: {
        power: number,
        weight: number,
        currentHealth: number,
        maxHealth: number
    } = {
        power: 5,
        weight: 12,
        currentHealth: 1000,
        maxHealth: 1000
    }

    @Column()
    rearWing: {
        downForce: number,
        weight: number,
        currentHealth: number,
        maxHealth: number
    } = {
        downForce: 3,
        weight: 10,
        currentHealth: 1000,
        maxHealth: 1000
    }

    @Column()
    frontWing: {
        downForce: number,
        weight: number,
        currentHealth: number,
        maxHealth: number
    } = {
        downForce: 3,
        weight: 10,
        currentHealth: 1000,
        maxHealth: 1000
    }
}
