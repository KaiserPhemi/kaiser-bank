import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
  Param,
  Headers,
  Get,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { IUser } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //Create register function for API
  @Post('register')
  public async register(@Res() res, @Body() user: IUser): Promise<any> {
    const result: any = await this.usersService.create(user);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  //Create login function for API
  @Post('login')
  public async login(@Res() res, @Body() credentials: any): Promise<any> {
    const result: any = await this.usersService.login(credentials);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return res.status(HttpStatus.OK).json(result);
  }

  //Create auth endpoint
  //API endpoint:
  // /users/[id]
  // Header: {Key: Authorization, Value: token}
  @Post(':id')
  public async authenticate(
    @Param() params,
    @Res() res,
    @Headers() headers,
  ): Promise<any> {
    const token = headers.authorization.replace('Bearer', '');
    const result: any = await this.usersService.authenticate(params.id, token);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  //use: /users/[id]/balance
  @Get(':id/balance')
  public async getUserAccountsBalance(
    @Param() params,
    @Res() res,
  ): Promise<number> {
    const result: any = await this.usersService.userBalances(params.id);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  //use: /users/[id]/cards
  @Get(':id/cards')
  public async getUserCards(@Param() params, @Res() res): Promise<array> {
    const result: array = await this.usersService.userCards(params.id);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return res.status(HttpStatus.OK).json(result);
  }
}
