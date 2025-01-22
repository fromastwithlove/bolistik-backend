import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AppleAuthService } from './apple/apple-auth.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('app.jwtSecret'),
        signOptions: { expiresIn: '1y' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AppleAuthService],
})
export class AuthModule {}
