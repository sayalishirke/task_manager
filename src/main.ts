import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { LoggingMiddleware } from 'src/middlewares/logging.middleware';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('App Module')
    .setDescription('The API description')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(LoggingMiddleware)
  await app.listen(3005);
}
bootstrap();
