// src/user/dto/register.dto.ts
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Jean Dupont', description: "Nom de l'utilisateur" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'jean.dupont@example.com',
    description: "Adresse email de l'utilisateur",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Mot de passe (minimum 6 caractères)',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
