import {
    ArgumentsHost,
    Catch,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';

import * as moment from 'moment';
import { CustomLoggerService } from 'src/logger/logger.service';
import { BaseExceptionFilter } from '@nestjs/core';

@Injectable()
@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
    constructor(private readonly logger: CustomLoggerService) {
        super()
    }

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
            exception.message ||
            exception.message.message ||
            exception.message.error ||
            null;
        // this.logger.log(`【错误提示】:${JSON.stringify(message)}`);
        const errorResponse = {
            status,
            result: {
                error: message, // 获取全部的错误信息
            },
            message: (typeof message == 'string') ? (message || '请求失败') : JSON.stringify(message),
            code: 1, // 自定义code
            path: request.url, // 错误的url地址
            method: request.method, // 请求方式
            timestamp: new Date().toLocaleDateString(), // 错误的时间
        };
        // 打印日志
        this.logger.requestError(
            `【${moment().format('YYYY-MM-DD HH:mm:ss')}】${request.method} ${request.url} ${JSON.stringify(errorResponse)}`
        );
        // 设置返回的状态码、请求头、发送错误信息
        response.status(status);
        response.header('Content-Type', 'application/json; charset=utf-8');
        response.send(errorResponse);
    }
}