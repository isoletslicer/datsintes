import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>) { }
    async createUser(username: string, password: string): Promise<User> {
        return this.userModel.create({
            username,
            password,
        });
    }
    async getUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }
    async getUser(query: object): Promise<User> {
        return this.userModel.findOne(query);
    }
    async getMe(userId): Promise<User | undefined> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw 'User not found';
        }
        return user;
    }

    async updatePw(id: any, user: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, user, { new: true });
    }


}
