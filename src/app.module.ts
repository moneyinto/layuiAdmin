import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SystemModule } from './system/system.module';

@Module({
    imports: [TypeOrmModule.forRoot(), SystemModule],
    controllers: [],
    providers: []
})

export class AppModule {}
