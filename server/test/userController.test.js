const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { loginUser, registerUser, updateUser } = require('../controllers/userController');

describe('User Controller', () => {
  describe('loginUser', () => {   //Login User
    let userStub, jwtStub, res;
  
    beforeEach(() => {
      userStub = sinon.stub(User, 'login');
      jwtStub = sinon.stub(jwt, 'sign');
      res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should log in a user successfully', async () => {
      const fakeUser = { _id: '123', email: 'test@example.com', password: 'password123' };
      userStub.resolves(fakeUser);
      jwtStub.returns('token123');
  
      const req = { body: { email: 'test@example.com', password: 'password123' } };
      
      await loginUser(req, res);
      
      expect(userStub.calledWith(fakeUser.email, fakeUser.password)).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnceWith({ email: fakeUser.email, token: 'token123' })).to.be.true;
    });
    it('should handle login failure - invalid credentials', async () => {
      const req = { body: { email: 'invalidEmail.com', password: '123' } };
      userStub.rejects(new Error('Invalid credentials'));

      await loginUser(req, res);
  
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledOnceWith({ error: 'Invalid credentials' })).to.be.true;
    });
  });

  describe('registerUser', () => {  //Register User
    let userStub, jwtStub, res;

    beforeEach(() => {
      userStub = sinon.stub(User, 'register');
      jwtStub = sinon.stub(jwt, 'sign');
      res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    });
  
    afterEach(() => {
      sinon.restore();
    });

    it('should create a new user successfully', async () => {
      const fakeUser = { _id: '123', email: 'test@example.com', password: 'password123' };
      userStub.resolves(fakeUser);
      jwtStub.returns('token123');

      const req = { body: { email: fakeUser.email, password: fakeUser.password }};

      await registerUser( req, res);

      expect(userStub.calledWith(fakeUser.email, fakeUser.password)).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnceWith({ email: fakeUser.email, token: 'token123' })).to.be.true;
    });

    it('should handle registration failure - invalid credentails', async () => {
      const req = { body: { email: 'invalidEmail.com', password: '123' } };
      userStub.rejects(new Error('Invalid Credentials'));
  
      await registerUser(req, res);
      
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledOnceWith({ error: 'Invalid Credentials' })).to.be.true;
    });
  })
  describe('UpdateUser', () => {  //Update User
    let userStub, jwtStub, res, updateOneStub;
    
    beforeEach(() => {
      userStub = sinon.stub(User, 'update');
      updateOneStub = sinon.stub(User, 'updateOne').resolves();
      jwtStub = sinon.stub(jwt, 'sign');

      res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should update a user successfully', async () => {
      const fakeUserId = '123';
      const fakeUser = { email: 'updated@example.com', password: 'newPassword123' };
      userStub.resolves(fakeUser);
      jwtStub.returns('fakeToken123');
  
      const req = { user: { _id: fakeUserId }, body: { email: fakeUser.email, password: fakeUser.password } };
      
      await updateUser(req, res);
      
      expect(userStub.calledWith(fakeUser.email, fakeUser.password, fakeUserId)).to.be.true;
      expect(updateOneStub.calledWith({ _id: fakeUserId }, { $set: fakeUser })).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ email: fakeUser.email, token: 'fakeToken123' })).to.be.true;
    });
    it('should handle update failure', async () => {
      const fakeUserId = '123';
      const fakeUser = { email: 'updated@example.com', password: 'newPassword123' };
      userStub.rejects(new Error('Update failure'));

      const req = { user: { _id: fakeUserId }, body: { email: fakeUser.email, password: fakeUser.password } };

      await updateUser(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledOnceWith({ error: 'Update failure'})).to.be.true;
    })
  })
})