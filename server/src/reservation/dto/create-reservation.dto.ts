// src/reservation/dto/create-reservation.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({
    example: 123,
    description: "L'ID du film à réserver",
  })
  @IsNumber()
  movieId: number;

  @ApiProperty({
    // example: '2025-02-01T20:00:00Z',
    // date of now
    example: new Date().toISOString(),
    description: 'Date et heure du créneau de réservation (en format ISO)',
  })
  @IsDateString()
  timeSlot: string;
}
