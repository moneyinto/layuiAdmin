import { Injectable } from "@nestjs/common";
import { Connection } from "typeorm";
import { User } from "./../models/user.model";
import { Permission } from "./../models/permission.model";

@Injectable()
export class UserService {
    constructor(private readonly connection: Connection) {}
    async login(account, password) {
        const user = await this.connection
            .createQueryBuilder()
            .select("user.id, user.name, user.headImgUrl")
            .from(User, "user")
            .where("user.account = :account", { account: account })
            .andWhere("user.password = MD5(:password)", { password: password })
            .getRawOne();
        // const userRepository = this.connection.getRepository(User);
        // const user = await userRepository.findOne({ account: account });
        return user;
    }

    async getPower(user) {
        const power = await this.connection
            .createQueryBuilder()
            .select()
            .from(Permission, "permission")
            .execute();
        return power;
    }
}
