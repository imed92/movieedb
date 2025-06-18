import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  // Si Movie est une entité persistée, sinon stocke l'ID ou les infos nécessaires
  @Column()
  movieId: number;

  @Column({ type: 'timestamptz' })
  timeSlot: Date;
}
