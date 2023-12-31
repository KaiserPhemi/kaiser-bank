import { Body, Controller, Get, Param, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { TransactionService } from './modules/transaction/transaction.service';

//! import transactions/operation on account files
import { ITransaction } from './modules/transaction/interface/transaction.interface'
import { CreateTransaction } from './modules/transaction/interface/create-transation';
import { exception } from 'console';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly transactionService: TransactionService) { }

  //TODO implement later
  //dynamic template rendering
  // @Get()
  // root(@Res() res: Response) {
  //   return res.render(
  //     this.appService.getViewName(),
  //     { message: 'Dynamic view rendering' }
  //   );
  // }

  //? default view render
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  @Render('pages/home')
  home() {
    return {
      title: 'BankingApp',
      body: 'NestJS based banking API'
    };
  }

  @Get('account')
  @Render('pages/account')
  about() {
    return { title: 'Account login page' };
  }


  @Get('transactions')
  @Render('pages/transactions')
  transactions() {
    return { title: 'Transactions' };
  }

  ///http://localhost:3000/transaction
  @Get('transaction')
  async index(): Promise<ITransaction[]> {
    return this.transactionService.get();
  }

  @Get('transaction/:id')
  async find(@Param('id') id: number): Promise<ITransaction> {
    let result = this.transactionService.find(id);
    return result;
  }

  @Post('transaction')
  create(@Body() createTransaction: CreateTransaction) {
    this.transactionService.create(createTransaction);
    return createTransaction;
  }
}
