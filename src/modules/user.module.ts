import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { UserController } from "../controllers/user/user.controller";
import { LoginController } from "../controllers/user/login.controller";
import { AuthController } from "../controllers/user/auth.controller";
import { UserService } from "./../service/user.service";
import { AuthMiddleware } from './../middlewares/auth.middleware';
import { AuthService } from "src/service/auth.service";

@Module({
    imports: [],
    controllers: [UserController, LoginController, AuthController],
    providers: [UserService, AuthService]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(UserController, AuthController);
    }
}
