import { Injectable } from "@nestjs/common";
import { Connection, EntityManager } from "typeorm";
import { SysPermission } from "../entities/sysPermission.entity";
import { SysUser } from "../entities/sysUser.entity";
import { SysRolePermission } from "../entities/sysRolePermission.entity";

@Injectable()
export class PermissionService {
    constructor(private readonly connection: Connection, private manager: EntityManager) {}
    async getAllPermission() {
        const power = await this.connection
            .createQueryBuilder()
            .select()
            .from(SysPermission, "permission")
            .orderBy("id", "DESC")
            .execute();
        return power;
    }

    async getUserPermission(userId) {
        const user = await this.connection
            .createQueryBuilder()
            .select("user.id, user.roleId")
            .from(SysUser, "user")
            .where("user.id = :id", { id: userId })
            .getRawOne();
        // roleId 为 0 的话即为最高权限管理员
        let power = [];
        if (user.roleId == 0) {
            power = [
                {
                    key: "sysSetting",
                    name: "系统设置",
                    type: 2
                },
                {
                    key: "sysPermission",
                    name: "权限管理",
                    type: 2
                },
                {
                    key: "sysRole",
                    name: "角色管理",
                    type: 2
                },
                {
                    key: "sysUser",
                    name: "系统用户",
                    type: 2
                }
            ];
        } else  {
            power = await this.connection
                .createQueryBuilder()
                .select()
                .from(SysPermission, "permission")
                .execute();
        }
        return power;
    }

    async addPermission(data) {
        const permission = new SysPermission();
        permission.name = data.name;
        permission.type = data.type;
        permission.key = data.key;
        const result = await this.manager.save(permission);
        return result;
    }

    async editPermission(data) {
        const permission = new SysPermission();
        permission.name = data.name;
        permission.type = data.type;
        permission.key = data.key;
        const result = await this.manager.update(SysPermission, data.id, permission);
        return result;
    }

    async deletePermission(data) {
        const result = await this.manager.delete(SysPermission, data.ids);
        return result;
    }

    async getPermissionByRoleId(roleId) {
        const result = await this.manager.find(SysRolePermission, { roleId });
        return result;
    }

    async deleteRolePermissionByIds(ids) {
        const result = await this.manager.delete(SysRolePermission, ids);
        return result;
    }
}
