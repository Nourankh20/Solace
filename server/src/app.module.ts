import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';
import {AccountsModule} from './modules/account/account.module';
import { ExternalModule } from './modules/external/external.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    TransactionModule,
    UsersModule,
    AccountsModule,
    ExternalModule,
  ],
})
export class AppModule {}
