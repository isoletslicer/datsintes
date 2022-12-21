import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from './role.enum';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: [Role.Customer] })
    roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
