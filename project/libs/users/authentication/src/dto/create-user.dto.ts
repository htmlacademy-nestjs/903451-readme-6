import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'example@gmail.com',
  })
  public email: string;

  @ApiProperty({
    description: 'User birth date (ISO format)',
    example: '1995-05-05',
  })
  public dateBirth: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Jony',
  })
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Jonson',
  })
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  public password: string;
}
