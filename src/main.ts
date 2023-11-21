import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './infrastructure/plugins/swagger.plugin';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /** Setup documentation */
  setupSwagger('Impulse test', app);

  /** Setup Validation */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // exceptionFactory: (errors) => {
      //   return new RichValidationError(errors);
      // }
    }),
  );

  await app.listen(3000);
}
bootstrap();
