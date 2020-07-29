import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    key: string;

    @Column({ length: 500 })
    name: string;

    @Column()
    type: number; // 0: 功能权限 1：数据权限 2：页面权限
}
