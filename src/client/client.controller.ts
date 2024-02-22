import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateTransaction } from './ validation/createTransaction';

@Controller()
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Post('clientes/:id/transacoes')
  @UsePipes(new ValidationPipe())
  async makeTransactions(
    @Param('id') id: number,
    @Body() transaction: CreateTransaction,
  ) {
    return await this.clientService.createTransactionFromClient(
      id,
      transaction,
    );
  }
}
