// src/user/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'jean.dupont@example.com',
    description: "L'email de l'utilisateur",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: "Le mot de passe de l'utilisateur",
  })
  @IsNotEmpty()
  password: string;
}
