import { Command } from "@colyseus/command";
import { BrakeState, CarState, FuelTankState, MatchState, EngineState, PlayerState, PositionState, TiresState, WingState } from "../match.state";

interface OnJoinPayload {
    sessionId: string
}

export class OnJoinCommand extends Command<MatchState, OnJoinPayload> {

    execute(payload: OnJoinPayload) {

        const car = new CarState().assign({
            position: new PositionState(),
            engine: new EngineState(),
            tires: new TiresState(),
            brakes: new BrakeState(),
            fuelTank: new FuelTankState(),
            frontWing: new WingState(),
            rearWing: new WingState()
        })

        this.state.cars.set(car.id, car)

        this.state.players.set(payload.sessionId, new PlayerState().assign({
            sessionId: payload.sessionId,
            username: `Player ${payload.sessionId}`,
            carId: car.id
        }))
    }
}