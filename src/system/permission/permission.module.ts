import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { PermissionController } from "./permission.controller";
import { PermissionService } from "./permission.service";

@Module({
    imports: [],
    controllers: [PermissionController],
    providers: [PermissionService]
})

export class PermissionModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(PermissionController);
    }
}