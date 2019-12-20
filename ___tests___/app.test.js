require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Job = require('../lib/models/Job');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let job;

  beforeEach(async() => {
    job = await Job.create({
      major: 'Computer Science',
      devType: 'Full-Stack Developer',
      yearsCoding: '5 years',
      satisfaction: 'medium',
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new job', () => {
    return request(app)
      .post('/api/v1/jobs')
      .send({
        major: 'Computer Science',
        devType: 'Full-Stack Developer',
        yearsCoding: '5 years',
        satisfaction: 'medium',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          major: 'Computer Science',
          devType: 'Full-Stack Developer',
          yearsCoding: '5 years',
          satisfaction: 'medium',
          __v: 0
        });
      });
  });

  it('gets a job by Id', () => {
    return request(app)
      .get(`/api/v1/jobs/${job.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: job.id,
          major: 'Computer Science',
          devType: 'Full-Stack Developer',
          yearsCoding: '5 years',
          satisfaction: 'medium',
          __v: 0
        });
      });
  });

  it('gets all jobs', () => {
    return request(app)
      .get('/api/v1/jobs')
      .then(res => {
        expect(res.body).toEqual([{
          _id: job.id,
          major: 'Computer Science',
          devType: 'Full-Stack Developer',
          yearsCoding: '5 years',
          satisfaction: 'medium',
          __v: 0
        }]);
      });
  });

  it('updates a job', () => {
    return request(app)
      .patch(`/api/v1/jobs/${job.id}`)
      .send({ satisfaction: 'high' })
      .then(res => {
        expect(res.body).toEqual({
          _id: job.id,
          major: 'Computer Science',
          devType: 'Full-Stack Developer',
          yearsCoding: '5 years',
          satisfaction: 'high',
          __v: 0
        });
      });
  });

  it('deletes a job', () => {
    return request(app)
      .delete(`/api/v1/jobs/${job.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: job.id,
          major: 'Computer Science',
          devType: 'Full-Stack Developer',
          yearsCoding: '5 years',
          satisfaction: 'medium',
          __v: 0
        });
      });
  });
});
