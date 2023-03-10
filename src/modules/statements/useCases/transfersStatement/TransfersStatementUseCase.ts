
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { Statement } from "../../entities/Statement";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { CreateStatementError } from "../createStatement/CreateStatementError";
import { ITransfersStatementDTO } from "./ITransfersStatementDTO";

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER= 'transfer'
}

@injectable()
class TransfersStatementUseCase{
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository
  ){}

  async execute({amount , user_id , description , type , sender_id } :ITransfersStatementDTO) :Promise<Statement> {

    /* verificar se a conta da origem existe */

    if(user_id === sender_id){
      throw new CreateStatementError.SenderConflitsUser();
    }

    const sender_user = await this.usersRepository.findById(sender_id);

    if(!sender_user) {
      throw new CreateStatementError.SenderNotFound();
    }

      /* verificar se a conta do destinatário existe */
      const user = await this.usersRepository.findById(user_id);

      if(!user) {
        throw new CreateStatementError.UserNotFound();
      }


      const { balance } = await this.statementsRepository.getUserBalance({ user_id: sender_id });

      if (balance < amount) {
        throw new CreateStatementError.InsufficientFunds()
      }

      const transferTransaction = await this.statementsRepository.create({
        user_id : sender_id,
        type , /* transfer */
        amount,
        description
      });



       await this.statementsRepository.create({
        user_id,
        type : 'deposit' as OperationType,
        amount,
        description
      });


      return transferTransaction
  }
}

export { TransfersStatementUseCase}
