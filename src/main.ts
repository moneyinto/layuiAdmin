import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new Logger()    // implement of interface LoggerService
    });
    await app.listen(3000);
    console.log(`Listening to port 3000`);
}

bootstrap();
