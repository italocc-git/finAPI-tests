import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";


import { CreateUserError } from "./CreateUserError";
let usersRepository : InMemoryUsersRepository;
let createUserUseCase : CreateUserUseCase

describe('Create a new User' , () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)

  })

  it('should be able to create a new user', async() => {

    const newUserTest = {
      email: 'test@test.com',
      name: 'test name',
      password: '123321'
    }

    const user = await createUserUseCase.execute(newUserTest)

    expect(user).toHaveProperty('id')
  })
  it('should not be able to create a new user with the same email', async() => {

    await expect(async() => {
      const newUserTest = {
        email: 'test@test.com',
        name: 'test name',
        password: '555555'
      }

      await createUserUseCase.execute(newUserTest)

      const newUserTest2 = {
        email: 'test@test.com',
        name: 'Name Test',
        password: '111111'
      }

      await createUserUseCase.execute(newUserTest2)
    }).rejects.toBeInstanceOf(CreateUserError)
  })
})
