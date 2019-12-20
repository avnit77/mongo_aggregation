const csv = require('csvtojson');
const Job = require('../models/job');

function seedData() {
  return csv({ delimeter: ',' })
    .fromFile(__dirname + '/../../csv/job.csv')
    .then(csvToJsonFiles => {
      const jobs = csvToJsonFiles
        .map(job => ({
          major: job.undergradMajor,
          devType: job.devType,
          yearsCoding: job.yearsCoding,
          satisfaction: job.jobSatisfaction
        }));
      return Job.create(jobs);
    })
    .then(() => console.log('done'));
}

module.exports = {
  seedData
};
