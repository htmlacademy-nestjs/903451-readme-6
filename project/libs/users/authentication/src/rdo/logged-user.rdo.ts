import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'example@gmail.com',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Jonson',
  })
  @Expose()
  public accessToken: string;
}
