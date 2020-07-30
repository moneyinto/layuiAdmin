// logger.service.ts
import { LoggerService, Injectable } from '@nestjs/common'
import { configure, getLogger, Logger } from 'log4js'

@Injectable()
export class CustomLoggerService implements LoggerService {
    private readonly requestLogger: Logger
    private readonly errorLogger: Logger

    constructor() {
        // 创建logger 参数指的是categories
        this.requestLogger = getLogger('request')
        this.errorLogger = getLogger('error')

        // 日志输出格式
        const layout = {
            type: 'pattern',
            pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] %h %z %m'
        }

        const loggerDir = 'logs/';

        configure({
            appenders: {
                console: {
                    type: 'console'
                },
                // 请求日志
                stdout: {
                    type: 'dateFile',
                    filename: `${loggerDir}request.error.log`, // 日志文件名
                    // 文件名是否带上pattern dateFile默认pattern是yyyy-MM-dd
                    alwaysIncludePattern: true,
                    // 保留文件后缀名 false情况下会变成 request.log.2019-11-21
                    keepFileExt: true,
                    layout
                },
                // 应用异常日志
                errorout: {
                    type: 'dateFile',
                    filename: `${loggerDir}error.log`,
                    alwaysIncludePattern: true,
                    keepFileExt: true,
                    layout
                }
            },
            categories: {
                default: { appenders: ['console'], level: 'all' },
                request: { appenders: ['stdout'], level: 'info' },
                error: { appenders: ['errorout'], level: 'error' }
            }
        })
    }

    log(message: string): void {
        this.info(message)
    }

    info(message: string): void {
        this.requestLogger.info(message)
    }

    warn(message: string): void {
        this.errorLogger.warn(message)
    }

    error(message: string): void {
        this.errorLogger.error(message)
    }

    requestError(message: string): void {
        this.requestLogger.error(message)
    }
}