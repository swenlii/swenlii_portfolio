var express = require('express');
var router = express.Router();

router.get('/visitka', function(req, res, next) {
  res.render('works/visitka/index', { title: 'Swenlii\'s site' });
});

module.exports = router;