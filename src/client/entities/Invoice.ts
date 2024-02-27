namespace Invoice {
  export type Response = {
    saldo: BalanceResponse;
    ultimas_transacoes: Transaction.Object[];
  };

  export type BalanceResponse = {
    total: number;
    data_extrato: string;
    limite: number;
  };
}
