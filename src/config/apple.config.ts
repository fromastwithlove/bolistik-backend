import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import validateConfig from 'src/utils/validate-config';

type AppleConfig = {
  clientId: string;
};

class EnvironmentVariablesValidator {
  @IsString()
  APPLE_CLIENT_ID: string;
}

export default registerAs<AppleConfig>('apple', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    clientId: process.env.APPLE_CLIENT_ID,
  };
});
