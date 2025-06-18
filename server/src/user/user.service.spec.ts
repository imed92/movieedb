// src/user/user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

describe('UserService', () => {
  let service: UserService;

  // On simule le repository et le JwtService
  const mockUserRepository = {
    create: jest.fn((dto) => dto),
    save: jest.fn((user) => Promise.resolve({ id: Date.now(), ...user })),
    findOne: jest.fn(({ where: { email } }) => {
      if (email === 'exist@example.com') {
        return Promise.resolve({
          id: 1,
          name: 'Existing User',
          email,
          password: bcrypt.hashSync('password123', 10),
          role: 'user',
        });
      }
      return Promise.resolve(null);
    }),
  };

  const mockJwtService = {
    sign: jest.fn((payload) => 'signed-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a new user', async () => {
    const user = await service.register(
      'New User',
      'new@example.com',
      'password123',
    );
    expect(user).toHaveProperty('id');
    expect(user.email).toEqual('new@example.com');
  });

  it('should login with valid credentials', async () => {
    const result = await service.login('exist@example.com', 'password123');
    expect(result).toHaveProperty('access_token', 'signed-jwt-token');
  });

  it('should throw an error with invalid credentials', async () => {
    await expect(
      service.login('nonexist@example.com', 'password123'),
    ).rejects.toThrow();
  });
});
