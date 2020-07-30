import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SystemModule } from './system/system.module';
import { APP_FILTER } from "@nestjs/core";
import { GlobalExceptionsFilter } from "./filters/global-exception.filter";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { LoggerModule } from "./logger/logger.module";

@Module({
    imports: [TypeOrmModule.forRoot(), LoggerModule, SystemModule],
    controllers: [],
    providers: [
        { provide: APP_FILTER, useClass: GlobalExceptionsFilter },
        { provide: APP_FILTER, useClass: HttpExceptionFilter }
    ]
})

export class AppModule {}
