var express = require('express');
var router = express.Router();

var links = {};

links['joephilly'] = [{
	title: "JoePhilly's first link",
	url: "http://www.google.com"
},
{
	title: "JoePhilly's second link",
	url: "http://www.cuil.com"
}];

links['jbase'] = {
	title: "Jbase's link",
	url: "http://www.yahoo.com"
};

links['phil'] = {
	title: "Phil's link",
	url: "http://www.bing.com"
};

/* GET default. */
router.get('/', function(req, res, next) {
  res.send('Welcome to the API');
});

/* GET all links. */
router.get('/links', function(req, res, next) {
  res.send(links);
});

/* GET a user's links. */
router.get('/links/:user', function(req, res, next) {
  res.send(links[req.params.user]);
});

module.exports = router;
