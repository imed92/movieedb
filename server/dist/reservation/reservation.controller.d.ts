import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
export declare class ReservationController {
    private readonly reservationService;
    constructor(reservationService: ReservationService);
    create(createReservationDto: CreateReservationDto, req: any): Promise<import("./reservation.entity").Reservation>;
    getUserReservations(req: any): Promise<import("./reservation.entity").Reservation[]>;
    cancel(id: string, req: any): Promise<import("./reservation.entity").Reservation>;
}
