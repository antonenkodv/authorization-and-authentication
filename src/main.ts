import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { validationExceptionFactory } from './infrastructure/exceptions/validation.exception';
import { setupSwagger } from './infrastructure/plugins/swagger/swagger.plugin';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);

  /** Setup documentation */
  setupSwagger('Impulse test', app);

  /** Setup Validation */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: validationExceptionFactory,
    }),
  );

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('SERVER.PORT');

  await app.listen(PORT)
    .then(()=>console.log(`Server running on port: ${PORT}`))
    .catch((error)=>console.error(`Server running error ${error}`));
}
bootstrap();
