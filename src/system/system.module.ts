import { Module } from "@nestjs/common";
import { LoginModule } from "./login/login.module";
import { RoleModule } from "./role/role.module";
import { PermissionModule } from "./permission/permission.module";
import { UserModule } from "./user/user.module";

@Module({
    imports: [
        LoginModule,
        RoleModule,
        PermissionModule,
        UserModule
    ]
})
export class SystemModule {}
