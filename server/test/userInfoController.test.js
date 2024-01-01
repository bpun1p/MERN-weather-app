const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const UserInfo = require('../models/userInfoModel');
const { saveUserInfo, getUserInfo, updateUserInfo } = require('../controllers/userInfoController');

describe('User information', () => {
  describe('saveUserInfo', () => {
    let req, res, saveStub, jsonSpy;
    beforeEach(() => {
      saveStub = sinon.stub(UserInfo.prototype, 'save')
      req = {
        user: { _id: 'fakeUserId123' },
        body: { name: 'John Doe', imageFile: 'fakeBase64' }
      };
      res = {}
      jsonSpy = sinon.spy();
      res.status = sinon.stub().returns({ json: jsonSpy });
      res.json = jsonSpy;
    })
    afterEach(() => {
      sinon.restore();
    })
    it('should save user information successfully', async () => {
      const fakeUserInfo = {name: 'testName', imagefile: 'fakeBase64', user_id: 'fakeUserId'}
      saveStub.resolves(fakeUserInfo)

      await saveUserInfo(req, res);

      expect(saveStub.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(jsonSpy.calledWith({ msg: `saved user information: ${fakeUserInfo}` })).to.be.true;
    })
    it('should handle error and respond with status 400', async () => {
      const errorMessage = 'Failed to save'
      const error = new Error(errorMessage);
      saveStub.rejects(error);

      await saveUserInfo(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({msg: error})).to.be.true;
    })
  })
  describe('getUserInfo', () => {
    let findStub, req, res, sendSpy, jsonSpy;
    beforeEach(() => {
      findStub = sinon.stub(UserInfo, 'find')
      req = {
        user: { _id: 'fakeUserId123' },
      };
      res = {}
      sendSpy = sinon.spy()
      jsonSpy = sinon.spy();
      res.status = sinon.stub().returns({ json: jsonSpy });
      res.send = sendSpy;
      res.json = jsonSpy;
    })

    afterEach(() => {
      sinon.restore();
    })
    it('should get user information successfully', async () => {
      res.status = sinon.stub().returns({ send: sendSpy })
      const fakeUserInfo = {name: 'testName', imagefile: 'fakeBase64', user_id: 'fakeUserId'}
      findStub.resolves([fakeUserInfo])

      await getUserInfo(req, res);

      expect(findStub.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(sinon.match({ userInfo: [fakeUserInfo] }))).to.be.true;
    })
    it('should handle error and respond with 400', async () => {
      const errorMessage = 'Failed to save user information'
      const error = new Error(errorMessage);
      findStub.rejects(error);

      await getUserInfo(req, res);          

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({error: errorMessage})).to.be.true;
    })
  })
  describe('updateUserInfo', () => {
    let req, res, findStub, jsonSpy;

    beforeEach(() => {
      findStub = sinon.stub(UserInfo, 'find');
      updateOneStub = sinon.stub(UserInfo, 'updateOne');

      req = {
        user: {_id: 'fakeUserId123'},
        body: {name: 'updatedName', imageFile: 'updatedBase64Image'}
      };
      res = {};

      jsonSpy = sinon.spy();
      res.status = sinon.stub().returns({json: jsonSpy});
      res.json = jsonSpy;

      const mockUpdateResult = {
        matchedCount: 1,
        modifiedCount: 1,
        upsertedId: null,
        acknowledged: true
      };

      updateOneStub.resolves(mockUpdateResult);
    })

      afterEach(() => {
        sinon.restore()
      })
    it('should update users information', async () => {
      const oldUserInfo = [{name: 'oldName', imageFile: 'oldBase64Image'}]
      findStub.resolves(oldUserInfo)

      await updateUserInfo(req, res);

      expect(findStub.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true
      expect(jsonSpy.calledWith(sinon.match({ reponse: {msg: 'Updated'}}))).to.be.true;
    })
    it('should throw error and respond with status 400', async() => {
      const errorMessage = 'Fail to update'
      const error = new Error(errorMessage)
      findStub.rejects(error)

      await updateUserInfo(req, res);

      expect(res.status.calledWith(400)).to.be.true
      expect(jsonSpy.calledWith(sinon.match({error : errorMessage}))).to.be.true;
    })  
    it('should throw error when no changes are found', async () => {
      req = {
        user: {_id: 'fakeUserId123'},
        body: {name: 'oldName', imageFile: 'oldBase64Image'}
      }
      const oldUserInfo = [{name: 'oldName', imageFile: 'oldBase64Image'}]
      findStub.resolves(oldUserInfo);

      await updateUserInfo(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(jsonSpy.calledWith(sinon.match({error: 'No updates required'}))).to.be.true;
    })
  })
})