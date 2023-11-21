import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const JwtModuleProvider = JwtModule.registerAsync({
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get('JWT.SECRET'),
      signOptions: {
        expiresIn: configService.get('JWT.EXPIRES_IN'),
      },
    };
  },
  inject: [ConfigService],
});
