import { Get, Post, Controller, Body } from "@nestjs/common";
import { EntityManager } from 'typeorm';
import { Response } from "src/common/response";
import { UserService } from "src/service/user.service";
import { Business } from '../../common/business';
import PermissionData from '../../config/permissionData';
import { Permission } from './../../models/permission.model';

@Controller("user")
export class LoginController {
    constructor(private readonly userService: UserService, private manager: EntityManager) {}

    @Post("login")
    async login(@Body() loginInfo) {
        const user = await this.userService.login(loginInfo.account, loginInfo.password);
        if (user) {
            return new Response().setData({
                user: user,
                token: Business.encrypt({
                    id: user.id,
                    exp: Business.getNow() + 60 * 60 * 24
                })
            });
        } else {
            return new Response().setSuccess(false).setMsg("账号或密码不正确！");
        }
    }

    @Get("initPermission")
    async initPermission() {
        for (let [index, item] of PermissionData.entries()) {
            const permission = new Permission();
            permission.name = item.name;
            permission.type = item.type;
            await this.manager.save(permission);
        }

        return new Response().setSuccess(true);
    }
}
