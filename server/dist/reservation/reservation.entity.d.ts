import { User } from '../user/user.entity';
export declare class Reservation {
    id: number;
    user: User;
    movieId: number;
    timeSlot: Date;
}
