const { Router } = require('express');
const Job = require('../models/Job');

module.exports = Router()

  .post('/', (req, res, next) => {
    Job
      .create(req.body)
      .then(job => res.send(job))
      .catch(next);
  })

  .get('/title', (req, res, next) => {
    const { count = 10 } = req.query;
    Job
      .getJobsByTitle(Number(count))
      .then(jobsByTitle => res.send(jobsByTitle))
      .catch(next);
  })

  .get('/employed', (req, res, next) => {
    const { count = 10 } = req.query;
    Job
      .getEmployed(Number(count))
      .then(employed => res.send(employed))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Job
      .findById(req.params.id)
      .then(job => res.send(job))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    const { page = 1, perPage = 25 } = req.query;
    Job
      .find()
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(jobs => res.send(jobs))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Job
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(job => res.send(job))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Job
      .findByIdAndDelete(req.params.id)
      .then(job => res.send(job))
      .catch(next);
  });
