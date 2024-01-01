const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const validateAuth = require('../middleware/validateAuth');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

process.env.SECRET = 'your_test_secret';

describe('validate authentication', () => {
  let req, res, next, jwtVerifyStub, findOneStub;
  const mockUserDocument = { _id: 'fakeUserId' };

  beforeEach(() => {
    jwtVerifyStub = sinon.stub(jwt, 'verify')
    findOneStub = sinon.stub(User, 'findOne').resolves(mockUserDocument);

    next = sinon.spy();

    req = {
      headers: {
        authorization: 'Bearer fakeEncryptedToken'
      }
    }
    res = {
      status: sinon.stub(),
      json: sinon.stub()
    }
    res.status.returns(res)
  })
  afterEach(() => {
    sinon.restore();
  })
  it('successfully validates authorized user', async () => {
    jwtVerifyStub.withArgs('fakeToken', 'test_secret').resolves({_id: 'fakeUserId'})

    await validateAuth(req, res, next);

    // expect(next.calledOnce).to.be.true
  })
})
