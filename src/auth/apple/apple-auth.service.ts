import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';
import { AppleJWTHeader, AppleJWTPayload } from './apple-jwt.type';

/**
 * @see https://developer.apple.com/documentation/sign_in_with_apple/fetch_apple_s_public_key_for_verifying_token_signature
 * > select the key with the matching key identifier (kid) to verify the signature of any JSON Web Token (JWT)
 */
const APPLE_AUTH_TOKEN_URL = 'https://appleid.apple.com/auth/keys';

/** @see https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_rest_api */
const APPLE_ISSUER = 'https://appleid.apple.com';

@Injectable()
export class AppleAuthService {
  private readonly logger = new Logger(AppleAuthService.name);

  constructor(private readonly configService: ConfigService) {}

  async decodeAndVerifyAppleJWT(identityToken: string): Promise<AppleJWTPayload> {
    // Decode the header of the JWT to get the 'kid'
    const decodedHeader = jwt.decode(identityToken, { complete: true }) as { header: AppleJWTHeader };
    const { kid } = decodedHeader.header;

    if (!kid) {
      this.logger.error('Invalid key id');
    }

    const client = jwksClient({ jwksUri: APPLE_AUTH_TOKEN_URL });

    // Get the public key for the signing key 'kid'
    const key = await client.getSigningKey(kid);
    const publicKey = key.getPublicKey();

    // Verify the identity token with the public key using RS256 algorithm
    const payload = jwt.verify(identityToken, publicKey, { algorithms: ['RS256'] }) as AppleJWTPayload;

    // Validate the payload
    if (!this.validate(payload)) {
      throw Error('Invalid token payload');
    }

    this.logger.debug(`Verified payload: ${JSON.stringify(payload, null, 2)}`);
    return payload;
  }

  private validate(payload: AppleJWTPayload): boolean {
    if (payload.iss !== APPLE_ISSUER) {
      this.logger.error('Invalid issuer');
      return false;
    }
    if (payload.aud !== this.configService.getOrThrow('apple.clientId')) {
      this.logger.error('Invalid audience');
      return false;
    }
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      this.logger.error('Token expired');
      return false;
    }
    if (payload.nonce_supported !== true) {
      this.logger.error('Nonce not supported');
      return false;
    }

    return true;
  }
}
