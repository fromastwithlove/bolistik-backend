import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier of the user', example: 1 })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'The email address of the user', example: 'alan.turing@bolistik.kz' })
  email: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'The first name of the user', example: 'Alan', required: false })
  firstName?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'The last name of the user', example: 'Turing', required: false })
  lastName?: string;

  @Column({ type: 'boolean', default: true })
  @ApiProperty({
    description: 'Status of the user (active or not)',
    example: true,
  })
  isActive: boolean;

  @CreateDateColumn()
  @ApiProperty({
    description: 'Timestamp when the user was created',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the user was last updated',
  })
  @ApiProperty()
  updatedAt: Date;
}
