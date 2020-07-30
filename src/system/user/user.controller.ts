import { Post, Get, Controller, Body, Query } from "@nestjs/common";
import { Response } from "../..//common/response";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("用户管理")
@Controller("sys")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("addSysUser")
    async addSysUser(@Body() data) {
        let result;
        result = await this.userService.verifyDuplicateAccount(data.account);
        if (result.length > 0) return new Response().setSuccess(false).setMsg('账号已存在');
        result = await this.userService.addSysUser(data);
        return new Response().setSuccess(true).setData(result);
    }

    @Get("getSysUser")
    async getSysUser(@Query() query) {
        let result = await this.userService.getSysUser(query);
        return new Response().setSuccess(true).setCode(0).setCount(result[1]).setData(result[0]);
    }
}
