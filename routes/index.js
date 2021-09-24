var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Swenlii\'s site', lang: req.cookies.lang ? req.cookies.lang : 'en' });
});

router.get('/story', function(req, res, next) {
  res.render('story', { title: 'Story about me.', lang: req.cookies.lang ? req.cookies.lang : 'en' });
});

router.get('/works', function(req, res, next) {
  res.render('works', { title: 'My works', lang: req.cookies.lang ? req.cookies.lang : 'en' });
});

router.get('/abilities', function(req, res, next) {
  res.render('abilities', { title: 'My abilities', lang: req.cookies.lang ? req.cookies.lang : 'en' });
});

router.get('/terms', function(req, res, next) {
  res.render('terms', { title: 'Terms and conditions', lang: req.cookies.lang ? req.cookies.lang : 'en' });
});

router.get('/one-work', function(req, res, next) {
  res.render('one-work', { title: 'One work tempate', lang: req.cookies.lang ? req.cookies.lang : 'en' });
});

module.exports = router;