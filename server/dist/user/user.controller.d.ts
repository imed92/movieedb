import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(registerDto: RegisterDto): Promise<import("./user.entity").User>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    getMe(req: {
        user: {
            id: number;
        };
    }): Promise<import("./user.entity").User>;
    getAllUsers(): Promise<import("./user.entity").User[]>;
    updateUser(id: number, name: string, email: string): Promise<import("./user.entity").User>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
}
