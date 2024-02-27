import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientService } from '@client/services/client.service';
import { CreateTransaction } from '@client/validation/createTransaction';

@Controller()
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('clientes/:id/transacoes')
  @UsePipes(new ValidationPipe())
  async makeTransactions(
    @Param('id') id: number,
    @Body() transaction: CreateTransaction,
  ): Promise<Transaction.Response> {
    return await this.clientService.createTransactionFromClient(
      id,
      transaction,
    );
  }

  @Get('clientes/:id/extrato')
  async clientInvoices(@Param('id') id: number): Promise<any> {
    return await this.clientService.getClientInvoices(id);
  }
}
