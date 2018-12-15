import { Injectable } from "@nestjs/common";
import { Connection } from "typeorm";
import { User } from "./../models/user.model";

@Injectable()
export class UserService {
    constructor(private readonly connection: Connection) {}
    async login(account, password) {
        const user = await this.connection
            .createQueryBuilder()
            .select("*")
            .from(User, "user")
            .where("user.account = :account", { account: account })
            .where("user.password = MD5(:password)", { password: password })
            .getOne();
        return user;
    }
}
