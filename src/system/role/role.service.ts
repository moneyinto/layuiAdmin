import { Injectable } from "@nestjs/common";
import { Connection, EntityManager } from "typeorm";
import { SysRole } from "../entities/sysRole.entity";
import { SysRolePermission } from "../entities/sysRolePermission.entity";

@Injectable()
export class RoleService {
    constructor(private readonly connection: Connection, private manager: EntityManager) {}
    async getRoleList(userId) {
        const roleList = await this.connection
            .createQueryBuilder()
            .select("role.id, role.name, rolePermission.permissionIds")
            .from(SysRole, "role")
            .leftJoin(SysRolePermission, "rolePermission", "role.id = rolePermission.roleId")
            .where("role.parentId = :userId", { userId })
            .execute();
        return roleList;
    }

    async verifyDuplicateName(userId, name) {
        const result = await this.connection
            .createQueryBuilder()
            .select()
            .from(SysRole, 'role')
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
            .into(SysRole)
            .values({
                name: name,
                parentId: userId
            })
            .execute()
        await this.manager.insert(SysRolePermission, { roleId: result.raw.insertId, permissionIds })
        return result;
    }

    async editRole(id, name, permissionIds) {
        const result = await this.connection
            .createQueryBuilder()
            .update(SysRole)
            .set({ name })
            .where("id = :id", { id })
            .execute()
        await this.manager.update(SysRolePermission, { roleId: id }, { permissionIds })
        return result;
    }

    async deleteRole(userId, roleIds) {
        const result = await this.connection
            .createQueryBuilder()
            .delete()
            .from(SysRole)
            .where(`role.parentId = ${userId} AND role.id IN (${roleIds.join(',')})`)
            .execute()
        await this.connection
            .createQueryBuilder()
            .delete()
            .from(SysRolePermission, "role_permission")
            .where(`role_permission.roleId IN (${roleIds.join(',')})`)
            .execute()
        return result;
    }
}
