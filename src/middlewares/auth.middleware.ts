import { Injectable, NestMiddleware, MiddlewareFunction } from "@nestjs/common";
import { Business } from '../common/business';
import { Response } from "../common/response";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction {
        return (req, res, next) => {
            const authToken = Business.getCookie('LAYUI_TOKEN', req.headers.cookie);
            if (authToken) {
                Business.decrypt(authToken, (err, decoded) => {
                    if (err) {
                        switch(err.name) {
                            case "TokenExpiredError":
                                res.send(new Response().setCode(401).setSuccess(false).setMsg("登录过期"));
                                break;
                            default:
                                res.send(new Response().setCode(401).setSuccess(false).setMsg("没有访问权限"));
                                break;
                        }
                    } else {
                        req.user = decoded;
                        next();
                    }
                });
            } else {
                res.send(new Response().setCode(401).setSuccess(false).setMsg("请先登录"));
            }
        };
    }
}
