import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@sp/schemas';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TransactionModule} from '../transaction/transaction.module';
import {AccountsModule} from '../account/account.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),TransactionModule,AccountsModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}

