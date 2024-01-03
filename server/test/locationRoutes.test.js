const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../server');

describe('routes for locations',() => {
  describe('POST /dashboard', () => {
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkzNWI1YzBkNzcxODI1M2EzMmJkMmUiLCJpYXQiOjE3MDQxNTc5MjYsImV4cCI6MTcwNDc2MjcyNn0.XLfNRWDDjed_vgPzFcpcWF5LMBXCWs1RAITgTdTQgk0'
    it('should save location to dashboard succesfully', async () => {
      const res = await request(app)
        .post('/dashboard')
        .set('Authorization', `Bearer ${validToken}`)
        .send({
          _id: '65935b5c0d7718253a32bd2e', 
          location: 'Vancouver'    
        })
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('msg').to.equal('saved location Vancouver')
    })
  })
  describe('GET /library', () => {
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkzNWI1YzBkNzcxODI1M2EzMmJkMmUiLCJpYXQiOjE3MDQxNTc5MjYsImV4cCI6MTcwNDc2MjcyNn0.XLfNRWDDjed_vgPzFcpcWF5LMBXCWs1RAITgTdTQgk0'
    it('should retireve all data from the library', async () => {
      const res = await request(app)
        .get('/library')
        .set('Authorization', `Bearer ${validToken}`)
        .send({
          _id: '65935b5c0d7718253a32bd2e'
        })

      expect(res.body).to.be.an('array');
      expect(res.body).to.have.length.gt(1);
    })
    describe('DELETE /library', () => {
      // const dataToDelete = '6595e43f3f169038474751bf'
      // const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkzNWI1YzBkNzcxODI1M2EzMmJkMmUiLCJpYXQiOjE3MDQxNTc5MjYsImV4cCI6MTcwNDc2MjcyNn0.XLfNRWDDjed_vgPzFcpcWF5LMBXCWs1RAITgTdTQgk0'
      // it('should delete data from the library', async () => {
      //   const res = await request(app)
      //     .delete('/library')
      //     .set('Authorization', `Bearer ${validToken}`)
      //     .send({data: dataToDelete})
      
      //   expect(res.status).to.equal(200);
      //   expect(res.body).to.be.an('object');
      //   expect(res.body).to.have.property(_id).to.equal(dataToDelete)
      // })
    })
  })
})
