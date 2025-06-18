import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ name, email, password: hashed });
    return this.userRepository.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, sub: user.id, role: user.role };
      return { access_token: this.jwtService.sign(payload) };
    }
    throw new UnauthorizedException('Identifiants invalides');
  }

  async getUser(id: number) {
    if (!id) throw new UnauthorizedException('ID utilisateur invalide');
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException('Utilisateur non trouvé');
    return user;
  }

  async getAllUsers() {
    return this.userRepository.find();
  }

  async updateUser(id: number, name: string, email: string) {
    await this.userRepository.update(id, { name, email });
    return this.getUser(id);
  }

  async deleteUser(id: number) {
    const user = await this.getUser(id);
    await this.userRepository.remove(user);
    return { message: 'Utilisateur supprimé avec succès' };
  }
}
