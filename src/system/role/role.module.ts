import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

@Module({
    imports: [],
    controllers: [RoleController],
    providers: [RoleService]
})

export class RoleModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(RoleController);
    }
}