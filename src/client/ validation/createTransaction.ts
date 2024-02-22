import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

const transactionTypes: string[] = ['c', 'd'];

export class CreateTransaction implements Transaction.Create {
  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsString()
  @IsIn(transactionTypes)
  tipo: string;
  descricao: string;
}
