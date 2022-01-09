import { HttpStatus, Controller, Get, Req, Post, Body, Res, UseGuards, HttpException} from "@nestjs/common";
import { ExternalService } from "./external.service";
import { AuthGuard } from '@nestjs/passport';
// import { Request , Response } from 'express';
import { ExternalDto } from "./dtos/external.dto";
import { AccountService } from "../account/account.service";
import { ConstraintMetadata } from "class-validator/types/metadata/ConstraintMetadata";
import { TransactionDto } from "../transaction/dto/transaction.dto";
import { response } from "express";

@Controller("external")
export class ExternalController {
  constructor(
      private externalService: ExternalService,
      private accountService: AccountService
     
    ) {}
 
  @UseGuards(AuthGuard('jwt'))
  @Post("/transfer")
    CreateTransfer(@Body()dto:ExternalDto):any {
     try{
            return this.externalService.createTransfer(dto);
        } catch{
            (err) => console.log(err.message);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post("/CreateTransfer")
      CreateExternal(@Body()request:any):any {
    }
}

