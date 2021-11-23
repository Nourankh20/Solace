import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account,AccountDocument } from '@sp/schemas';
import { Model } from 'mongoose';

@Injectable()
export class AccountService {
  constructor(@InjectModel(Account.accountid) private accountModel: Model<AccountDocument>) {}

  /**
   * Returns all accounts from mongo database
   */
  findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

/**
 *  Returns all account that has the userid, expects userid a parameter
 */
  findAccount(uid: string): Promise<Account[]> {
    return this.accountModel.find({userid:uid}).exec();
  }
}

