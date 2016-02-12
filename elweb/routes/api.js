var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


var redis = require('redis');
var client = redis.createClient(6379, "192.168.99.100"); //creates a new client

client.on('connect', function() {
    console.log('connected to redis');
});

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
  client.get('favorite', function(err, reply){
  	res.send(reply);  	
  })
});

/* GET a user's links. */
router.get('/links/:user', function(req, res, next) {
  res.send(links[req.params.user]);
});

router.post('/links', function(req, res, next){
	console.log(req.body.favorite);
	client.set('favorite', req.body.favorite);
	res.send('Ok');
});

module.exports = router;
