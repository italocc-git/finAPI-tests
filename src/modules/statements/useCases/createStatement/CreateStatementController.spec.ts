import { Connection } from "typeorm";
import createConnectionDB from '../../../../database'
import { v4 as uuid } from 'uuid';
import { hash } from "bcryptjs";
import request from 'supertest'
import { app } from "../../../../app";
let connection: Connection;

describe('Create Statement Controller', () => {

  beforeAll(async () => {
    connection = await createConnectionDB()
    await connection.runMigrations()

    const id = uuid()
    const password = await hash('test-password', 8);


    await connection.query(
      `INSERT INTO USERS(id, name, email, password)
        values('${id}', 'test', 'testuser@test.com.br', '${password}')
      `,
  );

  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should not able to create a new deposit Statement with wrong user ',async() => {
    const responseToken = await request(app).post('/api/v1/sessions').send({
      email: 'wrong-user@test.com.br',
      password: 'test-password'
    })

    const { token} = responseToken.body

    const response = await request(app).post('/api/v1/statements/withdraw').send({
      amount: 100,
      description: 'withdrawing the value'
    }).set({
      Authorization: `Bearer ${token}`
    })


    expect(response.status).toBe(401)
  })

  it('should not able to create a new withdraw Statement without balance ',async() => {
    const responseToken = await request(app).post('/api/v1/sessions').send({
      email: 'testuser@test.com.br',
      password: 'test-password'
    })

    const { token} = responseToken.body

    const response = await request(app).post('/api/v1/statements/withdraw').send({
      amount: 100,
      description: 'withdrawing the value'
    }).set({
      Authorization: `Bearer ${token}`
    })


    expect(response.status).toBe(400)
  })


  it('should be able to create a new Stetement', async() => {
    const responseToken = await request(app).post('/api/v1/sessions').send({
      email: 'testuser@test.com.br',
      password: 'test-password'
    })

    const { token} = responseToken.body

    const response = await request(app).post('/api/v1/statements/deposit').send({
      amount: 950,
      description: 'depositting a value'
    }).set({
      Authorization: `Bearer ${token}`
    })


    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')

  })




})
