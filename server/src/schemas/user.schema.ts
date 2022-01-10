import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

/*
  The @Schema() decorator marks a class as a schema definition. 
  It maps the User class to a MongoDB collection of the same name, 
  but with an additional “s” at the end - so the final mongo collection
  name will be users.

  For additional info, visit: https://docs.nestjs.com/techniques/mongodb
*/


/*
@typedef {Object}  nameOfSchema
a required property named firstName of type string to get firstname of the user 
a required property named lastName of type string to get lastname of the user 
a required property named userId of type Number to get user's Id 
a required property named email of type string to get email of the user
a required property named password of type string to get password of the user 
a required property named phone of type string to get user's phone number
example for user to registerhe must add 
firstName : "karim", 
lastName:"karim" , 
userId:1001619, 
email: "karim.salem@student.giu-uni.de" 
, password:"K2510salem"
,phone"+201000008993" 
if user left any of properties empty or added a string instead of number he/she won't be able to register
*/

@Schema()
export class User {

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  userId: Number;

  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;

}
export const UserSchema = SchemaFactory.createForClass(User);
