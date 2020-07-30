import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService]
})

export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(UserController);
    }
}