import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import { Response } from 'superagent';
import app from '../src/api/app';
// @ts-ignore
import loginFake from './mocks/logins';
// @ts-ignore
import userFake from './mocks/users';
import UserModel from './../src/database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /login', () => {
  let response: Response;
 
  describe('POST /login', () => {
    afterEach(() => (UserModel.findOne as sinon.SinonStub).restore());
    it('Deve retornar um status code 200 e um token com o login realizado com sucesso', async () => {
      sinon.stub(UserModel, 'findOne').resolves(userFake[0]as UserModel);
      response = await chai.request(app).post('/login').send(loginFake.valid);
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property('token');
    });

    it('Deve retornar um status code 401 e uma mensagem de erro com a senha inválida', async () => {
      sinon.stub(UserModel, 'findOne').resolves(userFake[0]as UserModel);
      response = await chai.request(app).post('/login').send(loginFake.invalidPassword);
      expect(response.status).to.be.equal(401);
      expect(response.body).to.have.property('message');
      
    });

    it('Deve retornar um status code 400 e uma mensagem de erro com o usuário inválido', async () => {
      sinon.stub(UserModel, 'findOne').resolves(null);
      response = await chai.request(app).post('/login').send(loginFake.invalidUsername);
      expect(response.status).to.be.equal(400);
      expect(response.body).to.have.property('message');
    });
  });
});
