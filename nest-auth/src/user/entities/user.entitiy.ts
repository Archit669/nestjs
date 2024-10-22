import { Entity, ObjectIdColumn, Column } from "typeorm";

@Entity('users')
export class User{
    @ObjectIdColumn()
    id: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;
}