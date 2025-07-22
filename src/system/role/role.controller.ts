import { Post, Get, Controller, Body } from "@nestjs/common";
import { Response } from "src/common/response";
import { User } from '../decorator/user.decorator';
import { RoleService } from "./role.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("角色管理")
@Controller("sys")
export class RoleController {
    constructor(private readonly roleService: RoleService) {}
    @Get("getRoleList")
    async getRoleList(@User() user) {
        let roleList = await this.roleService.getRoleList(user.id);
        return new Response().setSuccess(true).setData(roleList);
    }

    @Post("addRole")
    async addRole(@User() user, @Body() data) {
        let result;
        result = await this.roleService.verifyDuplicateName(user.id, data.name);
        if (result.length > 0) return new Response().setSuccess(false).setMsg('角色名称已存在');
        result = await this.roleService.addRole(user.id, data.name, data.permissionIds);
        return new Response().setSuccess(true).setData(result);
    }

    @Post("editRole")
    async editRole(@User() user, @Body() data) {
        let result;
        result = await this.roleService.verifyDuplicateName(user.id, data.name);
        if (result.length > 0 && result[0].id != data.id) return new Response().setSuccess(false).setMsg('角色名称已存在');
        result = await this.roleService.editRole(data.id, data.name, data.permissionIds);
        return new Response().setSuccess(true).setData(result);
    }

    @Post("deleteRole")
    async deleteRole(@User() user, @Body() data) {
        let result = await this.roleService.deleteRole(user.id, data.ids);
        return new Response().setSuccess(true).setData(result);
    }
}
