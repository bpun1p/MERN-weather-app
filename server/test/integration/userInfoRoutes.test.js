const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../../server');

describe('User information routes', () => {
  const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkzNWI1YzBkNzcxODI1M2EzMmJkMmUiLCJpYXQiOjE3MDQxNTc5MjYsImV4cCI6MTcwNDc2MjcyNn0.XLfNRWDDjed_vgPzFcpcWF5LMBXCWs1RAITgTdTQgk0'
  it('should save user information successfully', async () => {
    const res = await request(app)
      .post('/userInfo/save')
      .set('Authorization', `Bearer ${validToken}`)
      .send({
        name: 'testName',
        imageFile: 'fakeImageFile'  
      })
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('msg');
  })
  it('should retrieve user information', async () => {
    const res = await request(app)
      .get('/userInfo/get')
      .set('Authorization', `Bearer ${validToken}`)

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object')
    expect(res.body).to.have.property('userInfo').to.have.length.gt(1)
  })
  it('should update user information', async () => {
    const res = await request(app)
      .patch('/userInfo/update')
      .set('Authorization', `Bearer ${validToken}`)
      .send({
        name: 'updatedName',
        imageFile: 'updatedFakeImageFile'
      })

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('response').to.have.property('msg').to.equal('Updated')
  })
})