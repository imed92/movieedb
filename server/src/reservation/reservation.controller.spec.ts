// src/reservation/reservation.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

describe('ReservationController', () => {
  let controller: ReservationController;
  let service: ReservationService;

  const mockReservationService = {
    createReservation: jest.fn((dto) => Promise.resolve({ id: 1, ...dto })),
    getUserReservations: jest.fn((userId) =>
      Promise.resolve([
        { id: 1, user: { id: userId }, movieId: 1, timeSlot: new Date() },
      ]),
    ),
    cancelReservation: jest.fn((id, userId) =>
      Promise.resolve({ message: 'Removed' }),
    ),
  };

  const req = { user: { id: 1 } };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        { provide: ReservationService, useValue: mockReservationService },
      ],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
    service = module.get<ReservationService>(ReservationService);
  });

  describe('create', () => {
    it('should create a reservation', async () => {
      const dto = { movieId: 1, timeSlot: new Date().toISOString() };
      const result = await controller.create(dto, req);
      expect(service.createReservation).toHaveBeenCalledWith({
        userId: req.user.id,
        movieId: dto.movieId,
        timeSlot: expect.any(Date),
      });
      expect(result).toHaveProperty('id');
    });
  });

  describe('getUserReservations', () => {
    it('should return reservations for the user', async () => {
      const result = await controller.getUserReservations(req);
      expect(service.getUserReservations).toHaveBeenCalledWith(req.user.id);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('cancel', () => {
    it('should cancel the reservation', async () => {
      const reservationId = '1';
      const result = await controller.cancel(reservationId, req);
      expect(service.cancelReservation).toHaveBeenCalledWith(1, req.user.id);
      expect(result).toHaveProperty('message', 'Removed');
    });
  });
});
