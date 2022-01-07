import { Controller, Get, Req, Post, Body, Res} from "@nestjs/common";
import { ExternalService } from "./external.service";

import { Request , Response } from 'express';

@Controller("external")
export class ExternalController {
  constructor(private externalService: ExternalService) {}
 

  @Post("/transfer")
   CreateTransfer(@Req() req:Request , @Res() res:Response): any {
    return res.send(this.externalService.createTransfer(req, res));
  }

}
