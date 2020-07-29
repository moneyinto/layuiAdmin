import { Post, Get, Controller, Body } from "@nestjs/common";
import { Response } from "src/common/response";
import { AuthService } from "src/service/auth.service";
import { User } from '../../decorator/user.decorator';


@Controller("sys")
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Get("getRoleList")
    async getRoleList(@User() user) {
        let roleList = await this.authService.getRoleList(user.id);
        return new Response().setSuccess(true).setData(roleList);
    }

    @Post("addRole")
    async addRole(@User() user, @Body() data) {
        let result;
        result = await this.authService.verifyDuplicateName(user.id, data.name);
        if (result.length > 0) return new Response().setSuccess(false).setMsg('角色名称已存在');
        result = await this.authService.addRole(user.id, data.name, data.permissionIds);
        return new Response().setSuccess(true).setData(result);
    }

    @Post("editRole")
    async eidtRole(@User() user, @Body() data) {
        let result;
        result = await this.authService.verifyDuplicateName(user.id, data.name);
        if (result.length > 0 && result[0].id != data.id) return new Response().setSuccess(false).setMsg('角色名称已存在');
        result = await this.authService.editRole(data.id, data.name, data.permissionIds);
        return new Response().setSuccess(true).setData(result);
    }

    @Post("deleteRole")
    async deleteRole(@User() user, @Body() data) {
        let result = await this.authService.deleteRole(user.id, data.ids);
        return new Response().setSuccess(true).setData(result);
    }

    @Post("addPermission")
    async addPermission(@Body() data) {
        let result = await this.authService.addPermission(data);
        return new Response().setSuccess(true).setData(result);
    }

    @Post("editPermission")
    async editPermission(@Body() data) {
        let result = await this.authService.editPermission(data);
        return new Response().setSuccess(true).setData(result);
    }

    @Post("deletePermission")
    async deletePermission(@Body() data) {
        let result = await this.authService.deletePermission(data);
        return new Response().setSuccess(true).setData(result);
    }

    @Get("getUserPermission")
    async getUserPermission(@User() user) {
        let power = await this.authService.getUserPermission(user.id);
        return new Response().setSuccess(true).setData(power);
    }

    @Get("getAllPermission")
    async getAllPermission() {
        let power = await this.authService.getAllPermission();
        return new Response().setSuccess(true).setData(power);
    }
}
