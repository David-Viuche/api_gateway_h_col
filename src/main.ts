import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()

  app.use(json({ limit: '10mb' }));

  app.setGlobalPrefix('api')

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI
  })

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API hospital Col')
    .setDescription('API para la gestión de pacientes, médicos y citas médicas')
    .setVersion('1.0')
    .addTag('Patients')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe);

  await app.listen(3000);
}
bootstrap();
