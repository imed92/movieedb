// src/reservation/reservation.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { BadRequestException } from '@nestjs/common';

describe('ReservationService', () => {
  let service: ReservationService;

  const mockReservationRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn((dto) => dto),
    save: jest.fn((dto) => Promise.resolve({ id: 1, ...dto })),
    remove: jest.fn((dto) => Promise.resolve({ message: 'Removed' })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getRepositoryToken(Reservation),
          useValue: mockReservationRepository,
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createReservation', () => {
    it('should create a reservation if no conflict exists', async () => {
      mockReservationRepository.find.mockResolvedValue([]); // aucun conflit
      const dto = {
        userId: 1,
        movieId: 1,
        timeSlot: new Date(),
      };
      const result = await service.createReservation(dto);
      expect(mockReservationRepository.find).toHaveBeenCalled();
      expect(mockReservationRepository.save).toHaveBeenCalled();
      expect(result).toHaveProperty('id');
    });

    it('should throw an error if time slot conflicts with an existing reservation', async () => {
      const existingReservation = {
        id: 2,
        user: { id: 1 },
        timeSlot: new Date('2025-01-01T10:00:00Z'),
      };
      mockReservationRepository.find.mockResolvedValue([existingReservation]);

      // Nouveau créneau chevauche le créneau existant (dans la période de 2h)
      const dto = {
        userId: 1,
        movieId: 1,
        timeSlot: new Date('2025-01-01T11:00:00Z'),
      };
      await expect(service.createReservation(dto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getUserReservations', () => {
    it('should return reservations for a given user', async () => {
      const reservations = [{ id: 1, user: { id: 1 } }];
      mockReservationRepository.find.mockResolvedValue(reservations);
      const result = await service.getUserReservations(1);
      expect(result).toEqual(reservations);
    });
  });

  describe('cancelReservation', () => {
    it('should cancel the reservation if found', async () => {
      const reservation = { id: 1, user: { id: 1 } };
      mockReservationRepository.findOne.mockResolvedValue(reservation);
      // Assurez-vous que remove renvoie la valeur attendue
      mockReservationRepository.remove.mockResolvedValue({
        message: 'Removed',
      });

      const result = await service.cancelReservation(1, 1);
      expect(mockReservationRepository.remove).toHaveBeenCalledWith(
        reservation,
      );
      expect(result).toEqual({ message: 'Removed' });
    });

    it('should throw an error if reservation is not found', async () => {
      mockReservationRepository.findOne.mockResolvedValue(null);
      await expect(service.cancelReservation(1, 1)).rejects.toThrow();
    });
  });
});
