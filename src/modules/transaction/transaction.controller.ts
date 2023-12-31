import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
  Param,
  Delete,
} from '@nestjs/common';

@Controller('transaction')
export class TransactionController {
  @Post('deposit/:amount')
  public async deposit(
    @Param() params,
    @Res() res,
    @Body() body,
  ): Promise<any> {
    const result: any = `Processing deposit money to Your account. Amount: ${params.amount}$ - TEST`;

    return res.status(HttpStatus.OK).json(result);
  }

  @Post('withdraw/:amount')
  public async withdraw(
    @Param() params,
    @Res() res,
    @Body() body,
  ): Promise<any> {
    const result: any = `Withdrawing money from Your account. Amount: ${params.amount}$ - TEST`;

    if (!params.amount) {
      throw new HttpException(
        "Input amount You're about to withdraw.",
        HttpStatus.BAD_REQUEST,
      );
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Patch('cancel/:id')
  /**
   * cancel pending / scheduled transaction,
   * providing ID of the transaction
   */
  public cancel(@Param() params, @Res() res, @Body() body): Promise<any> {
    const result: any = `Cancel pending transaction with ID: ${params.id}`;

    if (!params.id) {
      throw new HttpException(
        'Missing an ID for the transaction that had to be canceled',
        HttpStatus.BAD_REQUEST,
      );
    }

    return res.status(HttpStatus.OK).json(result);
  }
}
