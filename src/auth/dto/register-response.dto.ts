import { ApiResponseProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
  /**
   * The JWT token used for subsequent authentication
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SuBhzp9t-s1wkj2YbW3F5gdFqZk55gL73Q59cTg3swg"
   */
  @ApiResponseProperty({ type: String })
  accessToken: string;

  /**
   * The unique identifier for the user
   * @example 27
   */
  @ApiResponseProperty({ type: Number })
  userId: number;
}
