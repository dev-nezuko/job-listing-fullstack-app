import { expect } from 'chai';
import supertest from 'supertest';
import { app } from '../src/app';
import RESPONSE_CODES from '../src/constants/responseCodes';

describe('user authentication', () => {
  const randomNum = Math.random();
  const email = `johndoe${randomNum}@example.com`;

  const user = {
    name: 'John Doe',
    email,
    password: 'abcd1234',
  };

  it('should create a new user when valid data is provided', (done) => {
    supertest(app)
      .post('/api/auth/signup')
      .send(user)
      .expect(RESPONSE_CODES.ok)
      .end(async (err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should return an error if the user already exists', (done) => {
    supertest(app)
      .post('/api/auth/signup')
      .send(user)
      .expect(RESPONSE_CODES.conflictError)
      .end(async (err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal('User already exists');
        done();
      });
  });

  it('should login & receive auth token when correct crediantials are provided', (done) => {
    supertest(app)
      .post('/api/auth/login')
      .send(user)
      .expect(RESPONSE_CODES.ok)
      .end(async (err, res) => {
        if (err) return done(err);
        expect(res.body.payload.authtoken).to.be.a('string');
        done();
      });
  });

  it('should provide error in case of invalid user', (done) => {
    supertest(app)
      .post('/api/auth/login')
      .send({ ...user, email: 'abc@xyz.com' })
      .expect(RESPONSE_CODES.authorizationError)
      .end(async (err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal('Invalid email/password');
        done();
      });
  });

  it('should provide error in case of wrong password', (done) => {
    supertest(app)
      .post('/api/auth/login')
      .send({ ...user, password: 'abcd12345' })
      .expect(RESPONSE_CODES.authorizationError)
      .end(async (err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal('Invalid email/password');
        done();
      });
  });
});
