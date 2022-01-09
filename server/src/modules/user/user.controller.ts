import { Controller, Get, Request, UseGuards,Post, Body,Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  
  /**
   * API endpoint handler returns the authenticated user from JWT payload
   */
  //@UseGuards(AuthGuard('jwt'))
  @Get()
  user(@Request() req: any): any {
    return req.user;
  }

  /**
   * API endpoint handler returns all users from mongo database
   */
  
  @Get('list')
  users(): any {
    return this.userService.findAll();
  }

  /**
   * API endpoint handler for creating a user
   * @param {UserDto} dto checks that the user filled the register 
   * @return created user
   */ 
  
  @Post('/register')
    async register(@Body() dto:UserDto):Promise<any>{
    console.log('Entered post');
      const id_exists=(await this.userService.findUserbyId(dto.userId.toString()))!=null?true:false;
      const email_exists=(await this.userService.findUserbyEmail(dto.email))!=null?true:false;

      if(id_exists||email_exists){
        throw 500;
      }

      return this.userService.createUser(dto);
      
  }

   /**
   * API endpoint handler for getting the user
   * @param userId the id of the user to check
   * @return user object
   */ 
  
  @Get('idExists/:userId')
  async idExists(@Param('userId') userId: string):Promise<any>{
    return await this.userService.findUserbyId(userId);
  }

  /**
   * API endpoint handler for getting the user
   * @param userEmail the email of the user to check
   * @return user object
   */
  @Get('emailExists/:email')
  async emailExists(@Param('email') userEmail: string):Promise<any>{
    return this.userService.findUserbyEmail(userEmail);
  }

  
  
}
