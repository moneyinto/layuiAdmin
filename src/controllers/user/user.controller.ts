import { Post, Controller, Body } from "@nestjs/common";
import { Response } from "../..//common/response";
import { UserService } from "../../service/user.service";
import { Business } from "../../common/business";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}
}
