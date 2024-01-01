const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const User = require('../models/userModel');

describe('UserModel', () => {
  describe('register', () => {
    let hashStub, createStub, findOneStub, saltStub;

    beforeEach(() => {
      hashStub = sinon.stub(bcrypt, 'hash');
      saltStub = sinon.stub(bcrypt, 'genSalt');
      findOneStub = sinon.stub(User, 'findOne');
      createStub = sinon.stub(User, 'create');
    })

    afterEach(() => {
      sinon.restore();
    })

    it('should create a new user', async () => {
      hashStub.resolves('hashed_password');
      saltStub.resolves('fakeSalt');
      findOneStub.resolves(null);
      createStub.resolves({email: 'test@example.com', password: 'hashed_password'});

      const user = await User.register('test@example.com', 'Test-123')

      expect(user).to.have.property('email', 'test@example.com');
      expect(user).to.have.property('password', 'hashed_password');
    })
    it('should handle failure for empty fields', async () => {
      try {
        await User.register('', '');
        expect.fail('Expected an error but none was thrown');
      } catch (error) {
        expect(error.message).to.equal('All fields must be filled');
      }
    })
    it('should handle failure for invalid email', async () => {
      try {
         await User.register('invalidEmail.com', 'Test-123');
         expect.fail('Expected an error but none was thrown');
      } catch (error) {
        expect(error.message).to.equal('Email is not valid');
      }
    })
    it('should handle failure for weak password', async() => {
      try {
        await User.register('test@example.com', 'weakpassword123')
        expect.fail('Expected an error but none was thrown');
      } catch (error) {
        expect(error.message).to.equal('Password is not strong enough')
      }
    })
    it('should handle failure for existing email', async () => {
      findOneStub.resolves({ email: 'existing@example.com'});
      try {
        await User.register('existing@example.com', 'Test-123');
        expect.fail('No error was thrown when it was expected');
      } catch (error) {
        expect(error.message).to.equal('Email already exists');
      }
    })
  }),
  describe('login', () => {
    let findOneStub, bcryptCompareStub;

    beforeEach(() => {
      findOneStub = sinon.stub(User, 'findOne');
      bcryptCompareStub = sinon.stub(bcrypt, 'compare');
    })

    afterEach(() => {
      sinon.restore();
    })
    it('should login user', async () => {
      findOneStub.resolves('test@example.com', 'Test-123');
      bcryptCompareStub.resolves(true)

      const user = await User.login('test@example.com', 'Test-123');

      expect(user).to.equal('test@example.com')
    })
    it('should handle failure for empty fields', async () => {
      try {
        await User.login('','');
        expect.fail('Expected an error but none was thrown');
      } catch (error) {
        expect(error.message).to.equal('All fields must be filled');
      }
    })
    it('should handle failure to find user', async () => {
      findOneStub.resolves(null);
      try {
        await User.login('wrong@example.com', 'Test-123');
        expect.fail('Expected an error but none was thrown');
      } catch (error) {
        expect(error.message).to.equal('Incorrect email');
      }
    })
    it('should handle failure to autorize user due to incorrect password', async () => {
      findOneStub.resolves('test@example.com', 'wrongPassword');
      bcryptCompareStub.resolves(false);
      try {
        await User.login('test@example.com', 'wrongPassword');
        expect.fail('Expected an error but none was thrown');
      } catch (error) {
        expect(error.message).to.equal('Incorrect password');
      }
    })
  })
  describe('update', () => {
    let findStub, bcryptCompareStub, hashStub, saltStub;

    beforeEach(() => {
      findStub = sinon.stub(User, 'find');
      bcryptCompareStub = sinon.stub(bcrypt, 'compare')
      hashStub = sinon.stub(bcrypt, 'hash').resolves('hashed_password')
      saltStub = sinon.stub(bcrypt, 'genSalt').resolves('fakeSalt')
    })

    afterEach(() => {
      sinon.restore()
    })
    it('should update users password', async () => {
      findStub.resolves([{email: 'test@example.com', password: 'oldPassword'}]);
      bcryptCompareStub.resolves(false);

      const user = await User.update('test@example.com', 'newPassword-123', 'fakeUserId');

      expect(user).to.have.property('email', 'test@example.com')
      expect(user).to.have.property('password', 'hashed_password')
    })
    it('should update users email and password', async () => {
      findStub.resolves([{email: 'oldTestEmail@example.com', password: 'oldPassword'}]);
      bcryptCompareStub.resolves(false);

      const user = await User.update('newTestEmail@example.com', 'newPassword-123', 'fakeUserId');

      expect(user).to.have.property('email', 'newTestEmail@example.com')
      expect(user).to.have.property('password', 'hashed_password')
    })
    it('should handle empty email fields', async () => {
      try {
        await User.update('', 'Test-123', 'fakeUserId');
        expect.fail('Expected an error but none was thrown');
      } catch(error) {
        expect(error.message).to.equal('All fields must be filled');
      }
    })
    it('should handle empty password fields', async () => {
      try {
        await User.update('test@example.com', '', 'fakeUserId');
        expect.fail('Expected an error but none was thrown');
      } catch(error) {
        expect(error.message).to.equal('All fields must be filled');
      }
    })
    it('should handle failure for invalid email', async () => {
      try {
        await User.update('invalidEmail.com', 'Test-123', 'fakeUserId');
        expect.fail('Expected an error but non was thrown');
      } catch(error) {
        expect(error.message).to.equal('Email is not valid')
      }
    })
    it('should handle failure for weak password', async () => {
      try {
        await User.update('test@example.com', 'weakPassword', 'fakeUserId');
        expect.fail('Expected an error but non was thrown');
      } catch(error) {
        expect(error.message).to.equal('Password is not strong enough')
      }
    })
    it('should handle failure for no changes found', async () => {
      findStub.resolves([{email: 'test@example.com', password: 'oldPassword'}]);
      bcryptCompareStub.resolves(true);
  
      try {
        await User.update('test@example.com', 'oldPassword-123', 'fakeUserId');
        expect.fail('Expected an error but non was thrown');
      } catch(error) {
        expect(error.message).to.equal('No Updates Required; No changes found')
      }
    })
    it('should handle failure for same password', async () => {
      findStub.resolves([{email: 'oldTestEmail@example.com', password: 'sameOldPassword-123'}]);
      bcryptCompareStub.resolves(true);

      try {
        await User.update('newTestEmail@example.com', 'sameOldPassword-123', 'fakeUserId');
        expect.fail('Expected an error but non was thrown');
      } catch(error) {
        expect(error.message).to.equal('Password cannot be the same as last password')
      }
    })
  })
})
