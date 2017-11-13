'use strict';
const express = require('express');
const app = express(); // creates an instance of an express application
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const db = require('./models');
const path = require('path');

app.set('port', process.env.PORT || 8016);

app.use(volleyball);

// Set up bodyParser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Configuration for nunjucks
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', { noCache: true }); // point nunjucks to the proper directory for templates

// Static middleware
app.use(express.static(path.join(__dirname, '/public')));

db
  .sync({ force: true })
  .then(function() {
    app.listen(app.get('port'), function() {
      console.log(`Engaged! App started on http://localhost:${app.get('port')}! press Ctrl-C to disengage`);
    });
  })
  .catch(console.error);

app.use('/', require('./routes'));

app.get('/', function(req, res, next) {
  res.render('index');
  next();
});
