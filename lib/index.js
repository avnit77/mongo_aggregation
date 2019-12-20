const fs = require('fs').promises;
const mongoose = require('mongoose');
const csv = require('csvtojson');

mongoose.connect('mongodb://localhost:27017/phone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const schema = new mongoose.Schema({
  major: String,
  devType: String,
  yearsCoding: String,
  satisfaction: String
});

const Job = mongoose.model('Job', schema);

fs.readdir('./csv')
  .then(files => {
    return Promise.all(
      files.map(file => {
        return csv({
          delimiter: ','
        })
          .fromFile(`./csv/${file}`);
      })
    );
  })
  .then(csvToJsonFiles => {
    const jobs = csvToJsonFiles
      .map(job => ({
        major: job.UndergradMajor,
        devType: job.DevType,
        yearsCoding: job.YearsCoding,
        satisfaction: job.CareerSatisfaction
      }));

    return Job.create(jobs);
  })
  .then(() => console.log('done'));
