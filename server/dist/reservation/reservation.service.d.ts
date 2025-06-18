import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
export declare class ReservationService {
    private readonly reservationRepository;
    private readonly logger;
    constructor(reservationRepository: Repository<Reservation>);
    createReservation(data: {
        userId: number;
        movieId: number;
        timeSlot: Date;
    }): Promise<Reservation>;
    getUserReservations(userId: number): Promise<Reservation[]>;
    cancelReservation(id: number, userId: number): Promise<Reservation>;
}
