import { Injectable } from "@nestjs/common";
import { Connection, EntityManager, Not } from "typeorm";
import * as moment from 'moment';
import { Business } from "src/common/business";
import { SysUser } from "../entities/sysUser.entitiy";

@Injectable()
export class UserService {
    constructor(private readonly connection: Connection, private manager: EntityManager) {}
    async verifyDuplicateAccount(account) {
        const result = await this.manager.find(SysUser, { account });
        return result;
    }

    async addSysUser(user) {
        const result = await this.manager.insert(SysUser, {...user, password: Business.md5(user.password), createTime: moment().format('YYYY-MM-DD HH:mm:ss')});
        return result;
    }

    async getSysUser(query) {
        const result = this.manager.findAndCount(SysUser, {
            where: {
                isDeleted: 0,
                roleId: Not(0)
            },
            order: {
                createTime: "DESC"
            },
            skip: (Number(query.page) - 1) * Number(query.limit),
            take: Number(query.limit),
            cache: true
        });
        return result;
    }
}
