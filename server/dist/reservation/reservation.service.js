"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ReservationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reservation_entity_1 = require("./reservation.entity");
let ReservationService = ReservationService_1 = class ReservationService {
    constructor(reservationRepository) {
        this.reservationRepository = reservationRepository;
        this.logger = new common_1.Logger(ReservationService_1.name);
    }
    async createReservation(data) {
        const newStart = new Date(data.timeSlot);
        const newEnd = new Date(newStart.getTime() + 2 * 60 * 60 * 1000);
        const userReservations = await this.reservationRepository.find({
            where: { user: { id: data.userId } },
        });
        for (const res of userReservations) {
            const existingStart = new Date(res.timeSlot);
            const existingEnd = new Date(existingStart.getTime() + 2 * 60 * 60 * 1000);
            if (newStart < existingEnd && newEnd > existingStart) {
                throw new common_1.BadRequestException('Vous avez déjà une réservation sur ce créneau (2h de film).');
            }
        }
        const reservation = this.reservationRepository.create({
            user: { id: data.userId },
            movieId: data.movieId,
            timeSlot: newStart,
        });
        this.logger.log(`Création de réservation pour l'utilisateur ${data.userId} sur le film ${data.movieId}`);
        return await this.reservationRepository.save(reservation);
    }
    async getUserReservations(userId) {
        return await this.reservationRepository.find({
            where: { user: { id: userId } },
        });
    }
    async cancelReservation(id, userId) {
        const reservation = await this.reservationRepository.findOne({
            where: { id, user: { id: userId } },
        });
        if (!reservation) {
            throw new common_1.BadRequestException('Réservation non trouvée ou non autorisée');
        }
        this.logger.log(`Annulation de la réservation ${id} par l'utilisateur ${userId}`);
        return await this.reservationRepository.remove(reservation);
    }
};
exports.ReservationService = ReservationService;
exports.ReservationService = ReservationService = ReservationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReservationService);
//# sourceMappingURL=reservation.service.js.map