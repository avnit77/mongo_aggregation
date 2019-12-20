var db = require('mongodb').db;
db.articles.aggregate([
  { $match : { Employments : 'Employed full-time' } },
  { $group : {
    _id: null,
    major: '$UndergradMajor',
    devType: '$DevType',
    yearsCoding: '$YearsCoding',
    satisfaction: '$JobSatisfaction'
  } }]
);
