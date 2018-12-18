import { Post, Controller, Body } from "@nestjs/common";
import { Response } from "src/common/response";
import { UserService } from "src/service/user.service";
import { Business } from '../../common/business';

@Controller("user")
export class LoginController {
    constructor(private readonly userService: UserService) {}

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
}