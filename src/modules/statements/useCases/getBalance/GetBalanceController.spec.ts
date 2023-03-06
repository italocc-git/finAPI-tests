import { Connection } from "typeorm";
import createConnectionDB from '../../../../database'
import { v4 as uuid } from 'uuid';
import { hash } from "bcryptjs";
import request from 'supertest'
import { app } from "../../../../app";
let connection: Connection;
describe('Get Balance Controller', () => {

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

  it('should be able to list all balances' , async() => {
    const responseToken = await request(app).post('/api/v1/sessions').send({
      email: 'testuser@test.com.br',
      password: 'test-password'
    })

    const { token} = responseToken.body

    await request(app).post('/api/v1/statements/deposit').send({
      amount: 950,
      description: 'depositting a value'
    }).set({
      Authorization: `Bearer ${token}`
    })

    await request(app).post('/api/v1/statements/deposit').send({
      amount: 950,
      description: 'depositting a value'
    }).set({
      Authorization: `Bearer ${token}`
    })

    const response = await request(app).get('/api/v1/statements/balance')
    .set({
      Authorization: `Bearer ${token}`
    })
    expect(response.status).toBe(200);
    expect(response.body.statement.length).toBeGreaterThan(0);

  })
})
