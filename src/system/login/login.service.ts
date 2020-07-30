import { Injectable } from "@nestjs/common";
import { Connection, EntityManager, Not } from "typeorm";
import { SysUser } from "../entities/sysUser.entitiy";
import * as moment from 'moment';

@Injectable()
export class LoginService {
    constructor(private readonly connection: Connection, private manager: EntityManager) {}
    async login(account, password) {
        const user = await this.connection
            .createQueryBuilder()
            .select("user.id, user.name, user.headImgUrl, user.roleId")
            .from(SysUser, "user")
            .where("user.account = :account", { account: account })
            .andWhere("user.password = MD5(:password)", { password: password })
            .getRawOne();
        // const userRepository = this.connection.getRepository(User);
        // const user = await userRepository.findOne({ account: account });
        return user;
    }
}
