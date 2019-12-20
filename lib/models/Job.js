const mongoose = require('mongoose');


const schema = new mongoose.Schema({
  major: String,
  devType: String,
  yearsCoding: String,
  satisfaction: String
});

schema.statics.getEmployed = function() {
  return this.aggregate([
    {
      '$match': {
        Employment : 'Employed full-time'
      }
    }]);
};

schema.statics.getJobsByTitle = function(n = 10) {
  return this.aggregate([
    {
      '$group': {
        '_id': 'DevType'
      }
    }, {
      '$limit': n
    }
  ]);
};

module.exports = mongoose.model('Job', schema);
