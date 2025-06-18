// src/reservation/reservation.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateReservationDto } from './dto/create-reservation.dto';

@ApiTags('reservations')
@ApiBearerAuth('access-token')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Créer une réservation' })
  async create(@Body() createReservationDto: CreateReservationDto, @Req() req) {
    return await this.reservationService.createReservation({
      userId: req.user.id,
      movieId: createReservationDto.movieId,
      timeSlot: new Date(createReservationDto.timeSlot),
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Lister les réservations de l’utilisateur' })
  async getUserReservations(@Req() req) {
    return await this.reservationService.getUserReservations(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Annuler une réservation' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: "L'identifiant de la réservation à annuler",
  })
  async cancel(@Param('id') id: string, @Req() req) {
    return await this.reservationService.cancelReservation(
      parseInt(id, 10),
      req.user.id,
    );
  }
}
