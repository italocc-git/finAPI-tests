import { Request, Response } from "express";
import { container } from "tsyringe";
import { TransfersStatementUseCase } from "./TransfersStatementUseCase";

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER= 'transfer'
}

class TransfersStatementController {

  async execute(request : Request , response : Response) :Promise<Response> {

    const {user_id} = request.params
    const {id : sender_id} = request.user

    const {amount , description} = request.body

    const transfersStatement = container.resolve(TransfersStatementUseCase)

    const type = 'transfer' as OperationType

    const transfer = await transfersStatement.execute({
      user_id ,
      type,
      amount,
      description,
      sender_id
    })

    return response.status(201).json(transfer)
  }

}

export { TransfersStatementController}
