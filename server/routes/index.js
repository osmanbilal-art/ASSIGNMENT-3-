var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'FitLog - Home'
    });
});

/* GET home page. */
router.get('/home', function (req, res, next) {
    res.render('index', {
        title: 'FitLog - Home'
    });
});

/* GET About page. */
router.get('/about', function (req, res, next) {
    res.render('about', {
        title: 'About FitLog'
    });
});

module.exports = router;