import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from '@sp/schemas';
// import { AccountController } from '../account/account.controller';
import { AccountsModule } from '../account/account.module';
// import { AccountService } from '../account/account.service';
import {TransactionModule} from '../transaction/transaction.module';
import { ExternalController } from './external.controller';
import { ExternalService } from './external.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [
      TransactionModule,
      PassportModule,
      JwtModule.register({
        secret:"My-Secret-Key",
        signOptions: { expiresIn: '60s' },
      }),AccountsModule],
 
  controllers: [ExternalController],
  providers: [ExternalService , JwtStrategy],
})
export class ExternalModule {}


