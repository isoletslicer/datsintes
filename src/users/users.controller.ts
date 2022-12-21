import { Body, Controller, HttpStatus, Get, Param, UseGuards, Res, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import * as bcrypt from 'bcrypt';
import { HasRoles } from 'src/auth/guards/roles/has-roles.decorator';
import { Role } from './schemas/role.enum';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';


@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @HasRoles(Role.Staff)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAllUsers() {
        return this.userService.getUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getMe(@Param() params) {
        return this.userService.getMe(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async update(@Res() response, @Param('id') id,
        @Body('username') username: string,
        @Body('password') password: string,
        @Body('roles') roles: any

    ) {

        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const updatedUser = await this.userService.updatePw(id, { roles: roles, username: username, password: hashedPassword });
        return response.status(HttpStatus.OK).json({
            message: "Success Changed Password!"
        });
    }

}
