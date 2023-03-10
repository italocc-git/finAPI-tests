
enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER= 'transfer'
}

export type ITransfersStatementDTO = {
  user_id : string;
  sender_id : string;
  amount: number;
  description: string;
  type : OperationType;
}
