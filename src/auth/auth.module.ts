import { Module } from "@nestjs/common";
import { UserModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from "../users/users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../users/schemas/users.schema";
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from "./strategies/jwt.constants";
import { JwtStrategy } from "./strategies/jwt.strategy";


@Module({
    imports: [UserModule, PassportModule, JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '300s' },
    }), MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
    providers: [AuthService, UsersService, LocalStrategy, JwtStrategy
    ],
    controllers: [AuthController],
})
export class AuthModule { }
