import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';

@Injectable()
export class ReservationService {
  private readonly logger = new Logger(ReservationService.name);

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async createReservation(data: {
    userId: number;
    movieId: number;
    timeSlot: Date;
  }) {
    const newStart = new Date(data.timeSlot);
    const newEnd = new Date(newStart.getTime() + 2 * 60 * 60 * 1000);

    const userReservations = await this.reservationRepository.find({
      where: { user: { id: data.userId } },
    });

    for (const res of userReservations) {
      const existingStart = new Date(res.timeSlot);
      const existingEnd = new Date(
        existingStart.getTime() + 2 * 60 * 60 * 1000,
      );

      if (newStart < existingEnd && newEnd > existingStart) {
        throw new BadRequestException(
          'Vous avez déjà une réservation sur ce créneau (2h de film).',
        );
      }
    }

    const reservation = this.reservationRepository.create({
      user: { id: data.userId } as any,
      movieId: data.movieId,
      timeSlot: newStart,
    });
    this.logger.log(
      `Création de réservation pour l'utilisateur ${data.userId} sur le film ${data.movieId}`,
    );
    return await this.reservationRepository.save(reservation);
  }

  async getUserReservations(userId: number) {
    return await this.reservationRepository.find({
      where: { user: { id: userId } },
    });
  }

  async cancelReservation(id: number, userId: number) {
    const reservation = await this.reservationRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!reservation) {
      throw new BadRequestException('Réservation non trouvée ou non autorisée');
    }
    this.logger.log(
      `Annulation de la réservation ${id} par l'utilisateur ${userId}`,
    );
    return await this.reservationRepository.remove(reservation);
  }
}
