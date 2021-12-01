import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity('users')
export class User {
    @ObjectIdColumn() id: ObjectID;

    @Column()
    userId: string;

    @Column()
    raceControlPoints: number = 0;
}
