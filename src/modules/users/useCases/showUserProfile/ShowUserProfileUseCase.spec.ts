import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import {ShowUserProfileUseCase} from './ShowUserProfileUseCase'
import { ShowUserProfileError } from "./ShowUserProfileError";

let usersRepository : InMemoryUsersRepository;
let createUserUseCase : CreateUserUseCase;
let showUserProfileUseCase : ShowUserProfileUseCase


describe('Show User Profile', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
    showUserProfileUseCase = new ShowUserProfileUseCase(usersRepository)
  })

  it('should be able to show an user profile', async() => {
    const newUserTest = {
      email: 'test@test.com',
      name: 'test name',
      password: '123321'
    }

    const user = await createUserUseCase.execute(newUserTest)

    const userProfile = await showUserProfileUseCase.execute(user.id!)

    expect(userProfile).toHaveProperty('id')
  })
  it('should not be able to show an nonexistent user profile', async() => {

    expect(async() => {
      await showUserProfileUseCase.execute('wrong-user-id')
    }).rejects.toBeInstanceOf(ShowUserProfileError)
  })
})
