import { Post, Get, Controller, Body } from "@nestjs/common";
import { Response } from "src/common/response";
import { User } from '../decorator/user.decorator';
import { PermissionService } from "./permission.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("权限管理")
@Controller("sys")
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}
    @Post("addPermission")
    async addPermission(@Body() data) {
        let result = await this.permissionService.addPermission(data);
        return new Response().setSuccess(true).setData(result);
    }

    @Post("editPermission")
    async editPermission(@Body() data) {
        let result = await this.permissionService.editPermission(data);
        return new Response().setSuccess(true).setData(result);
    }

    @Post("deletePermission")
    async deletePermission(@Body() data) {
        let result = await this.permissionService.deletePermission(data);
        return new Response().setSuccess(true).setData(result);
    }

    @Get("getUserPermission")
    async getUserPermission(@User() user) {
        let power = await this.permissionService.getUserPermission(user.id);
        return new Response().setSuccess(true).setData(power);
    }

    @Get("getAllPermission")
    async getAllPermission() {
        let power = await this.permissionService.getAllPermission();
        return new Response().setSuccess(true).setData(power);
    }
}
