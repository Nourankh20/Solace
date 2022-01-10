import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

/*
  The @Schema() decorator marks a class as a schema definition. 
  It maps the User class to a MongoDB collection of the same name, 
  but with an additional “s” at the end - so the final mongo collection
  name will be users.

  For additional info, visit: https://docs.nestjs.com/techniques/mongodb

  * @property {string}  userid       -displays user's id 
  * @property {string}  status       -displays status of account wether active / inactive 
  * @property {string}  accountid    -displays account's 
  
  for account to be made it must have 
  userid:"1001619",
  status:"Active",
  accountid:"50100111130"


*/
@Schema()
export class Account {
  @Prop({ required: true })
  userid:string;

  @Prop({ required: true })
  status: string;
  
  @Prop({ required: true })
  accountid: string;

  
}

export const AccountSchema = SchemaFactory.createForClass(Account);