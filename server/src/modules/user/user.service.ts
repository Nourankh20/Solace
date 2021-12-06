import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@sp/schemas';
import { Model } from 'mongoose';
import {UserDto} from './dtos/user.dto';
import { AuthDto } from '../auth/dtos/auth.dto';
import { AccountService } from '../account/account.service';
import { TransactionService } from '../transaction/transaction.service';
import { TransactionDto } from '../transaction/dto/transaction.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
  private accountService:AccountService,
  private transactionService:TransactionService) {}


  /**
   * Gets the user from the mongo database
   * @param {AuthDto} dto checks if user has entered an email and a password 
   * @return {User} the user from the mongo database
   */
   async findOneUser(dto:AuthDto):Promise<User>{
     
      return await this.userModel.findOne({ email: dto.email,password:dto.password}).exec();
     
   }

    
  /**
   * Returns all users from mongo database
   */
  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  
  /**
   * Creates a user in the mongo database  
   * @param {UserDto} dto checks that the user filled the register 
   * @return {User} the created user object
   */
  async createUser(dto: UserDto):Promise<User>{
     
    const newUser = new this.userModel(dto);
    const newAccount = await this.accountService.createAccount(newUser.userId.toString());
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    
    const tdto:TransactionDto = {from_To:"Bank",accountid:(newAccount).accountid.toString(),amount:100,credit:1,debit:0,Display_date:today.toDateString(),name:"Initial deposit"}
    const newTransaction = await this.transactionService.createTransaction(tdto);
    return newUser.save();  

  }


   /**
   * Gets user by id from the mongo database  
   * @param userId the id of the user to find
   * @return user object
   */
  async findUserbyId(userId:string):Promise <any>{

    return await this.userModel.findOne({ userId:Number(userId)}).exec();

  }

}
