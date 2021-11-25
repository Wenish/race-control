import { Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity('users')
export class User {
    @ObjectIdColumn() id: ObjectID;
}
