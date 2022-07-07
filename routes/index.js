let express = require('express');
let router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  let path = req.cookies.lang && req.cookies.lang === 'ru' ? './language/ru/works.json' : './language/en/works.json'
  let rawdata = fs.readFileSync(path);
  let works = JSON.parse(rawdata);
  res.render('index', { title: 'Swenlii\'s site', lang: req.cookies.lang ? req.cookies.lang : 'en', works: works });
});

router.get('/story', function(req, res, next) {
  res.render('story', { title: 'Story about me.', lang: req.cookies.lang ? req.cookies.lang : 'en' });
});

router.get('/works', function(req, res, next) {
  let path = req.cookies.lang && req.cookies.lang === 'ru' ? './language/ru/works.json' : './language/en/works.json'
  let rawdata = fs.readFileSync(path);
  let works = JSON.parse(rawdata);
  res.render('works', { title: 'My works', lang: req.cookies.lang ? req.cookies.lang : 'en', works: works });
});

router.get('/abilities', function(req, res, next) {
  res.render('abilities', { title: 'My abilities', lang: req.cookies.lang ? req.cookies.lang : 'en' });
});

router.get('/privacy-policy', function(req, res, next) {
  res.render('privacy-policy', { title: 'Privacy policy', lang: req.cookies.lang ? req.cookies.lang : 'en' });
});

router.get('/materials', function(req, res, next) {
  res.render('terms', { title: 'Materials', lang: req.cookies.lang ? req.cookies.lang : 'en' });
});

router.get('/:id', function(req, res, next) {
  let path = req.cookies.lang && req.cookies.lang === 'ru' ? './language/ru/works.json' : './language/en/works.json'
  let rawdata = fs.readFileSync(path);
  let works = JSON.parse(rawdata);
  let one_work;
  works.forEach(el => {
    if (el.id === req.params.id) {
      one_work = el;
    }
  })
  res.render('one-work', { title: 'One work tempate', lang: req.cookies.lang ? req.cookies.lang : 'en', work: one_work });
});

module.exports = router;