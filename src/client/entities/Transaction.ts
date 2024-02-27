namespace Transaction {
  export interface Create {
    valor: number;
    tipo: string;
    descricao: string;
  }

  export type Object = {
    valor: number;
    tipo: string;
    descricao: string;
    realizada_em: string;
  };

  export type Request = {
    valor: number;
    tipo: 'c' | 'd';
    descricao: string;
  };

  export type Response = {
    limite: number;
    saldo: number;
  };
}
