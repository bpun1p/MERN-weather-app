const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const Location = require('../../models/locationModel');
const {saveLocation, getLocations, deleteLocation} = require('../../controllers/locationController');

describe('Location controllers', () => {
  describe('save location', () => {
    let req, res, saveStub;

    beforeEach(() => {
      saveStub = sinon.stub(Location.prototype, 'save');
      //mock the req obj
      req = {
        user: { _id: 'fakeUserId' },
        body: { location: 'testLocation' }
      }

      //mock the res obj
      res = {
        status: sinon.stub(),
        json: sinon.stub()
      }
      res.status.returns(res); // to ensure the chaining to json works
    })

    afterEach(() => {
      sinon.restore();
    })
    it('should save users locations', async () => {
      const testlocation = 'testLocation'
      saveStub.resolves({location: testlocation})

      await saveLocation(req, res);

      expect(saveStub.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({msg: `saved location ${testlocation}`})).to.be.true;
    })
    it('should handle error and return status 400', async () => {
      const errorMessage = 'Fail to save location'
      const error = new Error(errorMessage)
      saveStub.rejects(error);

      await saveLocation(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({msg: error})).to.be.true;
    })
  })
  describe('get locations', () => {
    let req, res, findStub;
    beforeEach(() => {
      findStub = sinon.stub(Location, 'find').returns({sort: sinon.stub().resolves(['mockLocation1', 'mockLocation2', 'mockLocation3'])})
      
      req = { user: { _id: 'fakeUserId' }}
      res = {
        send: sinon.spy(),
        status: sinon.stub(),
        json: sinon.spy()
      }
      res.status.returns(res);
    
    })
    afterEach(() => {
      sinon.restore()
    })
    it('should get all saved locations', async () => {
      await getLocations(req, res)
      
      expect(res.send.calledOnce).to.be.true;
      expect(res.send.calledWith(['mockLocation1', 'mockLocation2', 'mockLocation3'])).to.be.true
    })
    it('should handle error and return status 400', async () => {
      const errorMessage = 'Failed to retrieve locations'
      const error = new Error(errorMessage)
      findStub.returns({ sort: sinon.stub().rejects(error) }); // Set up to reject for this test

      await getLocations(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ msg: error })).to.be.true; // Check for the error message
    })
  })
  describe('delete locations', () => {
    let req, res, findByIdAndDeleteStub;
    const mockDeletedObj = {
      location: 'deletedLocation2',
      user_id: 'fakeUserId'
    }
    beforeEach(() => {
      findByIdAndDeleteStub = sinon.stub(Location, 'findByIdAndDelete').resolves(mockDeletedObj);
      req = {
        body: { data: 'fakeUserId' }
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
    it('deletes a location', async () => {
      await deleteLocation(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockDeletedObj)).to.be.true;
    })
    it('should handle error and return status 400', async () => {
      const error = new Error('Failed to delete location');  
      findByIdAndDeleteStub.rejects(error)

      await deleteLocation(req, res)

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({msg: error})).to.be.true;
    })
  })
})