import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const docPath = 'api-docs';

export function setupSwagger(
  appName: string,
  app: INestApplication
): void {

  const options = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(`API documentation for the ${appName}`)
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(docPath, app, document);

}
