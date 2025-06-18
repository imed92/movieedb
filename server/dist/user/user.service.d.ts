import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(name: string, email: string, password: string): Promise<User>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
    getUser(id: number): Promise<User>;
    getAllUsers(): Promise<User[]>;
    updateUser(id: number, name: string, email: string): Promise<User>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
}
