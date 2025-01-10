import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { AuthService } from '../src/auth/auth.service';
import { RegisterRequestDto } from '../src/auth/dto/register-request.dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleRef.createNestApplication();
    authService = app.get(AuthService);
    await app.init();
  });

  /**
   * Test case for the successful user registration.
   *
   * In this test, we send a valid `registerRequestDto` to the `/register` endpoint,
   * and we expect a 201 status code (Created) in response. Additionally, we verify
   * that the returned user data matches the input data, including a dynamically generated `id`.
   */
  it('/register (POST) - success', async () => {
    const registerRequestDto: RegisterRequestDto = {
      firstName: 'Albert',
      lastName: 'Einstein',
      email: 'albert.einstein@bolistik.kz',
    };

    const response = await request(app.getHttpServer()).post('/register').send(registerRequestDto).expect(201);

    // Check if the returned response matches the expected user data structure
    expect(response.body).toEqual({
      id: expect.any(Number), // Ensure the id is a number and dynamically generated
      firstName: registerRequestDto.firstName,
      lastName: registerRequestDto.lastName,
      email: registerRequestDto.email,
    });
  });

  /**
   * Test case for handling the conflict scenario where the user already exists.
   *
   * In this test, we first register a user with the same email address. Then we attempt to
   * register the same user again, which should result in a conflict error with status code 409.
   * We also verify that the error message returned is 'User already exists'.
   */
  it('/register (POST) - conflict (user already exists)', async () => {
    const registerRequestDto: RegisterRequestDto = {
      firstName: 'Albert',
      lastName: 'Einstein',
      email: 'albert.einstein@bolistik.kz',
    };

    // First call: Register the user successfully with the given details
    await request(app.getHttpServer()).post('/register').send(registerRequestDto).expect(201);

    // Second call: Attempt to register the same user, which should result in a conflict
    const response = await request(app.getHttpServer()).post('/register').send(registerRequestDto).expect(409);

    // Verify that the response contains the expected conflict message
    expect(response.body.message).toBe('User already exists');
  });

  // Cleanup after all tests are run
  afterAll(async () => {
    await app.close();
  });
});
