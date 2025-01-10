import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Fetch configuration values using ConfigService
  const configService = app.get(ConfigService);

  // Set the global prefix for all routes. All routes will be prefixed with "/api".
  app.setGlobalPrefix('api');

  // Enable versioning for the API using URI versioning
  // The default version will be set to '1', and versioning will be handled in the URL (e.g., /api/v1)
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Build Swagger documentation configuration
  const documentBuilderOptions = new DocumentBuilder()
    .setTitle('Bolistik')
    .setDescription('Bolipal API documentation')
    .setVersion('1.0')
    .addTag('bolistik')
    .addServer('http://localhost:3000/', 'Local')
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilderOptions);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.getOrThrow<number>('app.port'));
}
bootstrap();
