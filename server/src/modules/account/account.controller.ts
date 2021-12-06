import { Controller, Get, Param, Post,} from "@nestjs/common";
import { AccountService } from "./account.service";


@Controller("accounts")
export class AccountController {
  constructor(private accountService: AccountService) {}
 
   /**
   * API endpoint handler for getting all accounts in the database
   * @return array of all accounts
   */
  @Get()
  findAll(): any {
    return this.accountService.findAll();
  }


  /**
   * API endpoint handler for getting all accounts in the database that has userid === userid given
   * @param userid the id of the user that is retrieving the accounts that belongs to them
   * @return array of accounts that have the userid required
   */  
  @Get(":userid")
  GetAccount(@Param("userid") userid: string): any {
    return this.accountService.findAccounts(userid);
  }


  /**
   * API endpoint handler for creating an account
   * @param userid the id of the user that is creating the account
   * @return created account
   */ 
  @Post(":userid")
  CreateAccount(@Param("userid") userid: string): any {
    const account = this.accountService.createAccount(userid);
    return account;
  }


  /**
   * API endpoint handler for getting the balance of an account
   * @param accountid the id of the account we want the balance of
   * @return balance
   */ 
  @Get("user/balance/:accountid")
  getAccountBalance(@Param("accountid") accountid: any) :any{
    const balance=this.accountService.calculateBalance(accountid);
    return balance;
  }
}
