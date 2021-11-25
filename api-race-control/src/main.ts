import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import * as admin from 'firebase-admin';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('port');

  const adminConfig: admin.ServiceAccount = {
    projectId: configService.get('firebase.projectId'),
    privateKey: configService.get('firebase.privateKey').replace(/\\n/g, '\n'),
    clientEmail: configService.get('firebase.clientEmail'),
  };

  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });

  const config = new DocumentBuilder()
    .setTitle('API Race Control')
    .setDescription('Hehe boyyy')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /* enable validation with automatic parsing */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(port);
}
bootstrap();
