import { Injectable } from "@nestjs/common";
import { Connection, EntityManager } from "typeorm";
import { User } from "./../models/user.model";
import { Permission } from "./../models/permission.model";
import { Role } from "src/models/role.model";
import { RolePermission } from "src/models/role_permission.model";

@Injectable()
export class AuthService {
    constructor(private readonly connection: Connection, private manager: EntityManager) {}
    async getRoleList(userId) {
        const roleList = await this.connection
            .createQueryBuilder()
            .select("role.id, role.name, rolePermission.permissionIds")
            .from(Role, "role")
            .leftJoin(RolePermission, "rolePermission", "role.id = rolePermission.roleId")
            .where("role.parentId = :userId", { userId })
            .execute();
        return roleList;
    }

    async verifyDuplicateName(userId, name) {
        const result = await this.connection
            .createQueryBuilder()
            .select()
            .from(Role, 'role')
            .where("role.parentId = :parentId AND role.name = :name", {
                name: name,
                parentId: userId
            })
            .execute()
        return result;
    }

    async addRole(userId, name, permissionIds) {
        const result = await this.connection
            .createQueryBuilder()
            .insert()
            .into(Role)
            .values({
                name: name,
                parentId: userId
            })
            .execute()
        await this.manager.insert(RolePermission, { roleId: result.raw.insertId, permissionIds })
        return result;
    }

    async editRole(id, name, permissionIds) {
        const result = await this.connection
            .createQueryBuilder()
            .update(Role)
            .set({ name })
            .where("id = :id", { id })
            .execute()
        await this.manager.update(RolePermission, { roleId: id }, { permissionIds })
        return result;
    }

    async deleteRole(userId, roleIds) {
        const result = await this.connection
            .createQueryBuilder()
            .delete()
            .from(Role)
            .where(`role.parentId = ${userId} AND role.id IN (${roleIds.join(',')})`)
            .execute()
        await this.connection
            .createQueryBuilder()
            .delete()
            .from(RolePermission)
            .where(`role_permission.roleId IN (${roleIds.join(',')})`)
            .execute()
        return result;
    }

    async getAllPermission() {
        const power = await this.connection
            .createQueryBuilder()
            .select()
            .from(Permission, "permission")
            .orderBy("id", "DESC")
            .execute();
        return power;
    }

    async getUserPermission(userId) {
        const user = await this.connection
            .createQueryBuilder()
            .select("user.id, user.roleId")
            .from(User, "user")
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
                .from(Permission, "permission")
                .execute();
        }
        return power;
    }

    async addPermission(data) {
        const permission = new Permission();
        permission.name = data.name;
        permission.type = data.type;
        permission.key = data.key;
        const result = await this.manager.save(permission);
        return result;
    }

    async editPermission(data) {
        const permission = new Permission();
        permission.name = data.name;
        permission.type = data.type;
        permission.key = data.key;
        const result = await this.manager.update(Permission, data.id, permission);
        return result;
    }

    async deletePermission(data) {
        const result = await this.manager.delete(Permission, data.ids);
        return result;
    }

    async getPermissionByRoleId(roleId) {
        const result = await this.manager.find(RolePermission, { roleId });
        return result;
    }

    async deleteRolePermissionByIds(ids) {
        const result = await this.manager.delete(RolePermission, ids);
        return result;
    }
}
