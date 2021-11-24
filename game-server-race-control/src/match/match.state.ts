import shortid from 'shortid'
import { MapSchema, Schema, type } from '@colyseus/schema'

export class PositionState extends Schema {
    @type('number') x: number = 0
    @type('number') y: number = 0
    @type('number') z: number = 0
}

export class PlayerState extends Schema {
    @type('string') sessionId: string
    @type('string') username: string = 'Player Name'
    @type('string') carId: string
}

export class FuelTankState extends Schema {
    @type('number') currentLoad: number = 750;
    @type('number') maxLoad: number = 1000;

    
    @type('number') currentHelth: number = 10000;
    @type('number') maxHealth: number = 10000;
}

export class MotorState extends Schema {
    @type('number') power: number = 15
    @type('number') consumption: number = 1

    
    @type('number') currentHelth: number = 100;
    @type('number') maxHealth: number = 100;
}

export class TiresState extends Schema {
    @type('number') currentHelth: number = 100;
    @type('number') maxHealth: number = 100;

    @type('number') grip: number = 100;
    @type('number') consumption: number = 1;
}

export class BrakeState extends Schema {
    @type('number') power: number = 10

    @type('number') currentHelth: number = 100;
    @type('number') maxHealth: number = 100;
}

export class WingState extends Schema {
    @type('number') drag: number = 5
    @type('number') downForce: number = 5
    
    @type('number') currentHelth: number = 100;
    @type('number') maxHealth: number = 100;
}

export class CarState extends Schema {
    @type('string') id: string = shortid.generate()
    @type('string') name: string = 'Car Name'
    @type(PositionState) position: PositionState

    // Car Parts
    @type(FuelTankState) fuelTank: FuelTankState
    @type(MotorState) motor: MotorState
    @type(TiresState) tires: TiresState
    @type(BrakeState) brakes: BrakeState
    @type(WingState) rearWing: WingState
    @type(WingState) frontWing: WingState
}

export class MatchState extends Schema {
    @type('string') hello: string = 'world'
    @type({ map: PlayerState }) players = new MapSchema<PlayerState>()
    @type({ map: CarState }) cars = new MapSchema<CarState>()
}