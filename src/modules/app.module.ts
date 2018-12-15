import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user.module';

@Module({
    imports: [TypeOrmModule.forRoot(), UserModule],
    controllers: [],
    providers: []
})

export class AppModule {}
