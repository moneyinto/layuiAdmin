import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column("text")
    headImgUrl: string;

    @Column()
    password: string;

    @Column()
    account: string;

    @Column()
    isDeleted: boolean;
}
