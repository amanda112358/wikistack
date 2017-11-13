const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // res.send('went to GET /wiki');
  res.redirect('/');
})

router.post('/', (req, res) => {
  //res.send('went to POST /wiki');
  res.json(req.body);
})

router.get('/add', (req, res) => {
  res.render('addpage');
})

module.exports = router;
