import { Post, Controller, Body } from "@nestjs/common";
import { EntityManager } from 'typeorm';
import { Response } from "src/common/response";
import { Business } from '../../common/business';
import { LoginService } from "./login.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("后台登录")
@Controller("sys")
export class LoginController {
    constructor(private readonly loginService: LoginService, private manager: EntityManager) {}
    @Post("login")
    async login(@Body() loginInfo) {
        const user = await this.loginService.login(loginInfo.account, loginInfo.password);
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
}
