import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import app from '../src/api/app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /login', () => {
  it('Deve retornar um token', async () => {
    const response = await chai.request(app).post('/login').send({
      username: 'User1',
      password: 'senhaSecreta1'
    });
    expect(response).to.have.status(200);
  });
});
