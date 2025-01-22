import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AppleCredentialsRequestDto {
  @ApiProperty({
    description: 'The identity token provided by Apple during authentication.',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'Identity token is required' })
  identityToken: string;

  @ApiProperty({
    description: 'The authorization code provided by Apple during the OAuth flow.',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'Authorization code is required' })
  authorizationCode: string;
}
