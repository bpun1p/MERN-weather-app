const request = require('supertest');
const app = require('../server'); // Adjust this path to the actual location of your Express app
const chai = require('chai');
const expect = chai.expect;

describe('user authentication routes', () => {
  describe('POST /login', () => {
    it('should login successfully with correct credentials', async () => {
      const res = await request(app)
        .post('/user/login')
        .send({ email: 'Guest@gmail.com', password: 'Guest123su**' })
  
        expect(res.status).to.equal(200)
        expect(res.body).to.have.property('token');
    });
    it('should handle error when login with incorrect credentials', async () => {
      const res = await request(app)
        .post('/user/login')
        .send({email: 'Guest@gmail.com', password: 'fakePassword'})
  
        expect(res.status).to.equal(400)
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Incorrect password');      
    })
  })
  describe('POST /register', () => {
    // it('should register successfully with provided credentials', async () => {
    //   const res = await request(app)
    //     .post('/user/register')
    //     .send({email: 'test@example.com', password: 'Test-123'})

    //     expect(res.status).to.equal(200);
    //     expect(res.body).to.have.property('token');
    //     expect(res.body.email).to.equal('test@exmple.com')
    // })
  //   it('should handle error for registering with existing email', async () => {
  //     const res = await request(app)
  //       .post('/user/register')
  //       .send({email: 'test@example.com', password: 'Test-123'})

  //       expect(res.status).to.equal(400);
  //       expect(res.body).to.have.property('error');
  //       expect(res.body.error).to.equal('Email already exists')
  //   })
  })
  describe('PATCH /update', () => {
  //   it('should successfully update user credentials', async () => {
  //     const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkzNWI1YzBkNzcxODI1M2EzMmJkMmUiLCJpYXQiOjE3MDQxNTc5MjYsImV4cCI6MTcwNDc2MjcyNn0.XLfNRWDDjed_vgPzFcpcWF5LMBXCWs1RAITgTdTQgk0'
  //     const res = await request(app)
  //       .patch('/user/update')
  //       .set('Authorization', `Bearer ${validToken}`)
  //       .send({
  //         _id: '65935b5c0d7718253a32bd2e', 
  //         email: 'updatedTest@example.com',  
  //         password: 'updatedTest-123'     
  //       })

  //       expect(res.status).to.equal(200);
  //       expect(res.body).to.have.property('token');
  //       expect(res.body.email).to.equal('updatedTest@example.com')
  //   })
  // it('should handle error for updating user credentials', async () => {
  //     const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkzNWI1YzBkNzcxODI1M2EzMmJkMmUiLCJpYXQiOjE3MDQxNTc5MjYsImV4cCI6MTcwNDc2MjcyNn0.XLfNRWDDjed_vgPzFcpcWF5LMBXCWs1RAITgTdTQgk0'
  //     const res = await request(app)
  //       .patch('/user/update')
  //       .set('Authorization', `Bearer ${validToken}`)
  //       .send({
  //         _id: '65935b5c0d7718253a32bd2e', 
  //         email: 'updatedTest@example.com',  
  //         password: 'updatedTest-123'     
  //       })

  //       expect(res.status).to.equal(400);
  //       expect(res.body).to.have.property('error');
  //       expect(res.body.error).to.equal('No Updates Required; No changes found')
  //   })
  })
})
