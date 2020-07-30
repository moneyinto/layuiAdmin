import { Catch, ArgumentsHost, Injectable } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { CustomLoggerService } from 'src/logger/logger.service'
import { Request } from 'express'

@Injectable()
@Catch()
export class GlobalExceptionsFilter extends BaseExceptionFilter {
    constructor(private readonly logger: CustomLoggerService) {
        super()
    }

    catch(exception: Error, host: ArgumentsHost): void {
        super.catch(exception, host)

        const ctx = host.switchToHttp()
        const request: Request = ctx.getRequest()

        this.doLog(request, exception)
    }

    doLog(request: Request, exception: Error): void {
        const { url, headers, method, body } = request
        const ua = headers['user-agent']

        this.logger.error(
            `${method} ${url} ${ua} ${JSON.stringify(body)} ${exception.stack}`
        )
    }
}