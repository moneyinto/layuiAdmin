import { Post, Get, Controller, Body } from "@nestjs/common";
import { Response } from "src/common/response";
import { UserService } from "src/service/user.service";
import { User } from '../../decorator/user.decorator';


@Controller("user")
export class AuthController {
    constructor(private readonly userService: UserService) {}

    @Get("getRoleList")
    async getRoleList(@User() user) {
        console.log(user);
        return new Response().setSuccess(false).setMsg("");
    }

    @Get("getPower")
    async getPower(@User() user) {
        let power = await this.userService.getPower(user);
        return new Response().setSuccess(true).setData(power);
    }
}
