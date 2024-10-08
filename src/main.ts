import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ResponseInterceptor } from './interceptors/response.interceptor';

dotenv.config();

const APP_MODE = process.env.APP_MODE;
const PORT = parseInt(process.env.SERVER_PORT) || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  if (APP_MODE == 'DEV') {
    const config = new DocumentBuilder()
      .setTitle('Sela Property')
      .setDescription('The Sela Property API Documentations')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(PORT);
}
bootstrap();
