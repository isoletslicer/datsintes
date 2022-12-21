import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './products/products.module';
import { urlMongoDB } from './constants/urlmongo';

@Module({
  imports: [MongooseModule.forRoot(urlMongoDB.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'datasintesa_techtes'
  }), UserModule, ProductModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
