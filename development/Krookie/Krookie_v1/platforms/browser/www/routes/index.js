var express = require('express');
var router = express.Router();
var connection = require("../db/db_connection.js");

/* GET index page. */
router.get('/', function (req, res) {
  res.render('index', {
    title: 'Express'
  });
});

/* Klas kiezen */
router.get('/class', function (req, res) {
  res.render('class', {
    title: 'Kies hier jouw klas'
  });
})
/* Kies je avatar/vriendje */
router.get('/avatar', function (req, res) {
  res.render('avatar', {
    title: 'Avatar kiezen!'
  });
})
/* Instructies voor de applicatie */
router.get('/instruction', function (req, res) {
  res.render('instruction', {
    title: 'Zo werkt Krookie.'
  });
})
/* De zoektocht is begonnen */
router.get('/search', function (req, res) {
  res.render('search', {
    title: 'We gaan op zoek naar het boek, spannend!'
  });
})
/* Gevonden */
router.get('/found', function (req, res) {
  res.render('found', {
    title: 'Je hebt het boek gevonden!'
  });
})
/* Weetje */
router.get('/fact', function (req, res) {
  res.render('fact', {
    title: 'Hier vind je een weetje.'
  });
})
/* Weetje */
router.get('/like', function (req, res) {
  res.render('like', {
    title: 'Vind je dit boek leuk?'
  });
})
/* Opnieuw */
router.get('/refresh', function (req, res) {
  res.render('refresh', {
    title: 'Begin opnieuw'
  });
})

module.exports = router;