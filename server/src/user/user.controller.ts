import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('auth')
@ApiBearerAuth('access-token')
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Inscription' })
  async register(@Body() registerDto: RegisterDto) {
    return this.userService.register(
      registerDto.name,
      registerDto.email,
      registerDto.password,
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'Connexion' })
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Infos utilisateur connecté' })
  async getMe(@Request() req: { user: { id: number } }) {
    return this.userService.getUser(req.user.id);
  }

  @Get('users')
  @ApiOperation({ summary: 'Tous les utilisateurs' })
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('update')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  async updateUser(
    @Body('id') id: number,
    @Body('name') name: string,
    @Body('email') email: string,
  ) {
    return this.userService.updateUser(id, name, email);
  }

  @Post('delete')
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  async deleteUser(@Body('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
