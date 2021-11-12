import { MapSchema, Schema, type } from '@colyseus/schema'

export class MatchState extends Schema {
    @type('string') hello: string = 'world'
}