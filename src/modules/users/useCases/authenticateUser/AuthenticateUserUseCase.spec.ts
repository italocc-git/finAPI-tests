import { ICreateUserDTO } from './../createUser/ICreateUserDTO';
import 'reflect-metadata';
import { CreateUserUseCase } from './../createUser/CreateUserUseCase';
import { InMemoryUsersRepository } from './../../../users/repositories/in-memory/InMemoryUsersRepository';
import {AuthenticateUserUseCase} from './AuthenticateUserUseCase'
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";

let usersRepository : InMemoryUsersRepository;
let authenticateUserUseCase : AuthenticateUserUseCase
let createUserUseCase : CreateUserUseCase
describe('Authenticate User' , () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)

    createUserUseCase = new CreateUserUseCase(usersRepository)
  })

   it('should be able to authenticate user', async() => {

    const userTest : ICreateUserDTO = {
      email: 'test@test.com',
      name: 'test name',
      password: '123321',
    }

    await createUserUseCase.execute(userTest)

    const authentication = await authenticateUserUseCase.execute({
      email: userTest.email,
      password: userTest.password
    })


    expect(authentication).toHaveProperty('token')

  })

  it('should not be able to authenticate with a wrong email ' , async () => {

    await expect(async () => {

      const userTest : ICreateUserDTO = {
        email: 'test2@test.com',
        name: 'test2 name',
        password: '11113321'
      }

      await createUserUseCase.execute(userTest)

      await authenticateUserUseCase.execute({
        email: 'wrong-email',
        password: userTest.password
      })
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)
  })

  it('should not be able to authenticate with a wrong password ' , async () => {

    await expect(async () => {

      const userTest : ICreateUserDTO = {
        email: 'test3@test.com',
        name: 'test3 name',
        password: '123321555'
      }
      await createUserUseCase.execute(userTest)

      await authenticateUserUseCase.execute({
        email: userTest.email,
        password: 'wrong-password'
      })
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)
  })
})
