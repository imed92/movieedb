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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async register(name, email, password) {
        const hashed = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ name, email, password: hashed });
        return this.userRepository.save(user);
    }
    async login(email, password) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { email: user.email, sub: user.id, role: user.role };
            return { access_token: this.jwtService.sign(payload) };
        }
        throw new common_1.UnauthorizedException('Identifiants invalides');
    }
    async getUser(id) {
        if (!id)
            throw new common_1.UnauthorizedException('ID utilisateur invalide');
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user)
            throw new common_1.UnauthorizedException('Utilisateur non trouvé');
        return user;
    }
    async getAllUsers() {
        return this.userRepository.find();
    }
    async updateUser(id, name, email) {
        await this.userRepository.update(id, { name, email });
        return this.getUser(id);
    }
    async deleteUser(id) {
        const user = await this.getUser(id);
        await this.userRepository.remove(user);
        return { message: 'Utilisateur supprimé avec succès' };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map