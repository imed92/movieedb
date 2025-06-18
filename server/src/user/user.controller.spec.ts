// src/user/user.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  // Création d'un mock pour le UserService
  const mockUserService = {
    register: jest.fn((name: string, email: string, password: string) =>
      Promise.resolve({ id: 1, name, email }),
    ),
    login: jest.fn((email: string, password: string) => {
      if (email === 'test@example.com' && password === 'password123') {
        return Promise.resolve({ access_token: 'fake-token' });
      }
      throw new UnauthorizedException();
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerDto: RegisterDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await controller.register(registerDto);
      expect(userService.register).toHaveBeenCalledWith(
        registerDto.name,
        registerDto.email,
        registerDto.password,
      );
      expect(result).toEqual({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
      });
    });
  });

  describe('login', () => {
    it('should return an access token with valid credentials', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await controller.login(loginDto);
      expect(userService.login).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );
      expect(result).toEqual({ access_token: 'fake-token' });
    });

    it('should throw an error with invalid credentials', async () => {
      const loginDto: LoginDto = {
        email: 'invalid@example.com',
        password: 'wrongpassword',
      };

      await expect(controller.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
