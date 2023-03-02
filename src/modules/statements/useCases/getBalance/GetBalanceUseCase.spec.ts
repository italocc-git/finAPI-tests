import 'reflect-metadata';
import { GetBalanceUseCase } from './GetBalanceUseCase';
import { InMemoryUsersRepository } from './../../../users/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryStatementsRepository } from './../../repositories/in-memory/InMemoryStatementsRepository';
import { GetBalanceError } from './GetBalanceError';

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

let usersRepository : InMemoryUsersRepository;
let statementsRepository : InMemoryStatementsRepository;
let getBalanceUseCase : GetBalanceUseCase

describe('Get Balance' , () => {

  let DEPOSIT = 'deposit' as OperationType
  let WITHDRAW = 'withdraw' as OperationType

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    statementsRepository = new InMemoryStatementsRepository()
    getBalanceUseCase = new GetBalanceUseCase(
      statementsRepository, usersRepository)

  })

  it('should be able to list all withdraw and deposit operations' , async() => {


    const user = await usersRepository.create({
      email: 'test@test.com',
      name: 'test name',
      password: '123321'
    })


     await statementsRepository.create({
      user_id : user.id!,
      type: DEPOSIT,
      amount: 900,
      description: 'description statement test'
  })

  await statementsRepository.create({
    user_id : user.id!,
    type: WITHDRAW,
    amount: 350,
    description: 'description statement test'
})

  const {statement} = await getBalanceUseCase.execute({
    user_id : user.id!
  })
  expect(statement.length).toBeGreaterThan(0)
  })

  it('should not be able to list with a wrong user' , async() => {
    expect(async () => {
      const statement = await statementsRepository.create({
        user_id : 'wrong-user',
        type: DEPOSIT,
        amount: 350,
        description: 'description statement test'
    })

    await getBalanceUseCase.execute({
      user_id : statement.user_id
    })
    }).rejects.toBeInstanceOf(GetBalanceError)
  })
})
