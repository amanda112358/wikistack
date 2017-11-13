const express = require('express');
const router = express.Router();
const db = require('../models');
const Page = db.model('page');
const User = db.model('user');

router.get('/', (req, res) => {
  // res.send('went to GET /wiki');
  res.redirect('/');
});

router.post('/', (req, res) => {
  //res.send('went to POST /wiki');
  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
  });
  // page
  //  .save()
  //  .then(() => {
  //    res.json(page);
  //  })
  //  .catch(console.err);
  // page
  //   .save()
  //   .then(res.json)
  //   .catch(console.err);

  page
    .save()
    .then(function(bar) {
      console.log('bar', bar);
      res.json(bar);
    })
    .catch(console.err);
});

router.get('/add', (req, res) => {
  res.render('addpage');
});

module.exports = router;
