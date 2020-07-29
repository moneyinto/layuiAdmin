import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roleId: number;

    @Column({ length: 500 })
    name: string;

    @Column({type: "text", nullable: true})
    headImgUrl: string;

    @Column()
    password: string;

    @Column()
    account: string;

    @Column()
    createTime: string;

    @Column({default: ''})
    updateTime: string;

    @Column({default: false})
    isDeleted: boolean;
}
