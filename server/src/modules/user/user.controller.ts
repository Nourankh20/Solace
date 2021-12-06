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
  @UseGuards(AuthGuard('jwt'))
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
  register(@Body() dto:UserDto):any{
    console.log('Entered post');
      return this.userService.createUser(dto);
      
  }

   /**
   * API endpoint handler for getting the user
   * @param userId the id of the user to check
   * @return user object
   */ 
  @Get(':userId')
  exists(@Param('userId') userId: string):any{
    return this.userService.findUserbyId(userId);
  }
  
}
