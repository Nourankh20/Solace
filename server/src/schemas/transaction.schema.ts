import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

/*
  The @Schema() decorator marks a class as a schema definition. 
  It maps the User class to a MongoDB collection of the same name, 
  but with an additional “s” at the end - so the final mongo collection
  name will be users.

  For additional info, visit: https://docs.nestjs.com/techniques/mongodb

  @typedef {Object}  nameOfSchema
 * @property {string}  from_to        - displays where money has been transfered from whom to whom
 * @property {string}  Display_date   - displays date where transaction has been done
 * @property {string}  name           -displays name of transaction 
 * @property {number}  debit        - displays user's debit side 
 * @property {number}  credit       - displays user's credit side
 * @property {number}  amount       -displays amount of money that has been transfered 
 * @property {string}  accountid     -displays account's id 

  for transaction to be made user must have 
  from_To:"Bank",
  Display_date:"Sat Dec 04 2021",
  name: "intial balance",
  debit:0,
  credit:1,
  amount:100,
  accountid:50100111130

  





*/
@Schema()
export class Transaction {
  @Prop({ required: true })
  from_To: string;

  @Prop({ required: true })
  Display_date: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  debit: number;

  @Prop({ required: false })
  credit: number;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  accountid: string;
 

}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);