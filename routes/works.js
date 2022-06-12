var express = require('express');
var router = express.Router();

router.get('/visitka', function(req, res, next) {
  res.render('works/visitka/index', { title: 'One page site' });
});

router.get('/astro-for-children', function(req, res, next) {
  res.render('works/astro-for-children/index', { title: 'Astrochild' });
});

module.exports = router;