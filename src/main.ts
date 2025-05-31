import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from './interceptors/zod-validation.pipe';
import { baseSchema } from './interceptors/base.schema';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Class validator
  app.useGlobalPipes(new ValidationPipe());
  // Enable CORS
  app.enableCors();
  // Set global prefix
  app.setGlobalPrefix('api/v1');
  // Enable Zod validation pipe
  app.useGlobalPipes(new ZodValidationPipe(baseSchema));
  // Get port from environment variable or use default
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
void bootstrap();
