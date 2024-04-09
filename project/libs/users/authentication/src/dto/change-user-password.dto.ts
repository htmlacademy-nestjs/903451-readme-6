import { ApiProperty } from '@nestjs/swagger';

export class ChangeUserPasswordDto {
  @ApiProperty({
    description: 'Current user password',
    example: '123456',
  })
  public currentPassword: string;

  @ApiProperty({
    description: 'New user password',
    example: '123456',
  })
  public newPassword: string;
}
