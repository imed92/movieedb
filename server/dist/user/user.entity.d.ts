import { Reservation } from '../reservation/reservation.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    reservations: Reservation[];
}
