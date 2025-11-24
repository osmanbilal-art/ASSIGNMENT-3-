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



module.exports = router;