import { Body, Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from './guards/local-auth.guard';
@Controller()
export class AuthController {
    constructor(private authService: AuthService, private readonly userService: UsersService) { }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('/signup')
    async createUser(
        @Body('password') password: string,
        @Body('username') username: string,
    ): Promise<User> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const result = await this.userService.createUser(
            username,
            hashedPassword,
        );
        return result;
    }
}
