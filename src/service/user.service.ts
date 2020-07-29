import { Injectable } from "@nestjs/common";
import { Connection, EntityManager, Not } from "typeorm";
import { User } from "./../models/user.model";
import * as moment from 'moment';
import { Business } from "src/common/business";

@Injectable()
export class UserService {
    constructor(private readonly connection: Connection, private manager: EntityManager) {}
    async login(account, password) {
        const user = await this.connection
            .createQueryBuilder()
            .select("user.id, user.name, user.headImgUrl, user.roleId")
            .from(User, "user")
            .where("user.account = :account", { account: account })
            .andWhere("user.password = MD5(:password)", { password: password })
            .getRawOne();
        // const userRepository = this.connection.getRepository(User);
        // const user = await userRepository.findOne({ account: account });
        return user;
    }

    async verifyDuplicateAccount(account) {
        const result = await this.manager.find(User, { account });
        return result;
    }

    async addSysUser(user) {
        const result = await this.manager.insert(User, {...user, password: Business.md5(user.password), createTime: moment().format('YYYY-MM-DD HH:mm:ss')});
        return result;
    }

    async getSysUser(query) {
        const result = this.manager.findAndCount(User, {
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
