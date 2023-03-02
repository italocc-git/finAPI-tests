import { InMemoryUsersRepository } from './../../../users/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryStatementsRepository } from './../../repositories/in-memory/InMemoryStatementsRepository';
import { CreateStatementUseCase } from './CreateStatementUseCase';
import { CreateStatementError } from "./CreateStatementError";

let createStatementUseCase : CreateStatementUseCase;
let usersRepository : InMemoryUsersRepository;
let statementsRepository : InMemoryStatementsRepository;

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

describe('Create Statement' , () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    statementsRepository = new InMemoryStatementsRepository()
    createStatementUseCase = new CreateStatementUseCase(usersRepository,
      statementsRepository)
  })

  it('it should be able to create a new deposit Statement' , async() => {
    let DEPOSIT = 'deposit' as OperationType

    const user = await usersRepository.create({
      email: 'test@test.com',
      name: 'test name',
      password: '123321'
    })

    const createStetement = await createStatementUseCase.execute({
        user_id : user.id!,
        type: DEPOSIT,
        amount: 900,
        description: 'description statement test'
    })

    expect(createStetement).toHaveProperty('id')
  })
  it('should not be able to create a new Statement with wrong user' , async() => {


    expect(async () => {
      let DEPOSIT = 'deposit' as OperationType


      await createStatementUseCase.execute({
          user_id : 'wrong-user',
          type: DEPOSIT,
          amount: 900,
          description: 'description statement test'
      })
    }).rejects.toBeInstanceOf(CreateStatementError.UserNotFound)
  })

  it('should not be able to create a new Statement with insufficient funds' , async() => {


    expect(async () => {
      let WITHDRAW = 'withdraw' as OperationType

      const user = await usersRepository.create({
        email: 'test@test.com',
        name: 'test name',
        password: '123321'
      })

      await createStatementUseCase.execute({
          user_id : user.id!,
          type: WITHDRAW,
          amount: 500,
          description: 'description statement test'
      })
    }).rejects.toBeInstanceOf(CreateStatementError.InsufficientFunds)
  })
})
