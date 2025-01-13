import { User } from 'src/users/entities/user.entity';

export type JwtPayloadType = Pick<User, 'id' | 'email'>;
