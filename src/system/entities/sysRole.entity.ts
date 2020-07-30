import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SysRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column()
    parentId: number;
}
