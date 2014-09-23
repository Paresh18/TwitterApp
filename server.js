
/**
 * Module requirements.
 */

var express = require('express')
  , search = require('./searchtweets')

/**
 * Create app.
 */

var app = express.createServer();

/**
 * Configuration
 */

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', { layout: false });

/**
 * Routes
 */

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/searchtweets', function (req, res, next) {
  search(req.query.q, function (err, tweets) {
    if (err) return next(err);
	var results = [];
    res.render('searchtweets', { results: tweets, search: req.query.q });
  });
});

/**
 * Listen
 */

app.listen(3000);
