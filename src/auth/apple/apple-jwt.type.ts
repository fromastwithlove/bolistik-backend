/** @see https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_rest_api/authenticating_users_with_sign_in_with_apple */
export type AppleJWTPayload = {
  iss: string;
  aud: string;
  exp: number;
  iat: number;
  sub: string;
  nonce: string;
  nonce_supported: boolean;
  c_hash: string;
  email: string;
  email_verified: boolean;
  is_private_email: boolean;
  auth_time: number;
};

export type AppleJWTHeader = {
  alg: string; // The algorithm used for signing the token (e.g., RS256)
  kid: string; // The Key ID used to fetch the corresponding public key from JWKS
  typ: string; // The type of the token, usually 'JWT'
};
