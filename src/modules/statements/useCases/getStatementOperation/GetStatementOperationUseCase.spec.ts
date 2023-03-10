import { InMemoryUsersRepository } from './../../../users/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryStatementsRepository } from './../../repositories/in-memory/InMemoryStatementsRepository';
import { GetStatementOperationUseCase } from './GetStatementOperationUseCase';
import { GetStatementOperationError } from "./GetStatementOperationError";

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER= 'transfer'
}

let usersRepository : InMemoryUsersRepository;
let statementsRepository : InMemoryStatementsRepository;
let getStatementOperationUseCase : GetStatementOperationUseCase

describe('Get Statement Operation', () => {

  let DEPOSIT = 'deposit' as OperationType
  let WITHDRAW = 'withdraw' as OperationType

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    statementsRepository = new InMemoryStatementsRepository()
    getStatementOperationUseCase = new GetStatementOperationUseCase(
       usersRepository  , statementsRepository)

  })

  it('should be able to show operation statement details ' , async() => {

    const user = await usersRepository.create({
      email: 'test@test.com',
      name: 'test name',
      password: '123321'
    })


     const statement = await statementsRepository.create({
      user_id : user.id!,
      type: DEPOSIT,
      amount: 900,
      description: 'description statement test'
  })

    const statementDetails = await getStatementOperationUseCase.execute({
      user_id : statement.user_id,
      statement_id : statement.id!
    })

    expect(statementDetails).toHaveProperty('id')

})

it('should not be able to show operation statement details with wrong user ' , async() => {

  expect(async () => {
    const statement = await statementsRepository.create({
      user_id : 'wrong-user',
      type: DEPOSIT,
      amount: 350,
      description: 'description statement test'
  })

  await getStatementOperationUseCase.execute({
    user_id : statement.user_id,
    statement_id : statement.id!
  })
  }).rejects.toBeInstanceOf(GetStatementOperationError.UserNotFound)

})
it('should not be able to show operation statement details with wrong statement ID ' , async() => {

  expect(async () => {
    const user = await usersRepository.create({
      email: 'test@test.com',
      name: 'test name',
      password: '123321'
    })


  await getStatementOperationUseCase.execute({
    user_id : user.id!,
    statement_id : 'wrong-statement-id'
  })
  }).rejects.toBeInstanceOf(GetStatementOperationError.StatementNotFound)

})
})
