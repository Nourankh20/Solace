import { IsEmail, IsNotEmpty, IsNumber, isPhoneNumber , } from 'class-validator';

export class UserDto {

  @IsNotEmpty()
  firstName:string;

  @IsNotEmpty()
  lastName:string;

 
  @IsNumber()
  userId:number;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  phone: string;

}