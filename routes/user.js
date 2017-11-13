const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('USER_PAGE_HTML_HERE')
})

module.exports = router;
