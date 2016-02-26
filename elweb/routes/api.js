var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var redis = require('redis');

var client = redis.createClient(6379, "192.168.99.100"); //creates a new client
client.on('connect', function() { console.log('connected to redis'); });
client.flushdb(function (err, success) {});
client.set('next_user_id', 1, redis.print);
client.hset('users:1', 'username', 'admin', redis.print);
client.hset('logins:admin', "id", 1, redis.print);
client.incr('next_user_id', function (err, reply) {});
client.zadd('links:1', (new Date).getTime(), "http://expira.link");
client.zadd('links:1', (new Date).getTime(), "http://google.com");

client.zrevrangebyscore([ 'links:1', 9999999999999, 0 ], function (err, response) {
    console.log('response: ' + response);
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
router.get('/links/:userId', function(req, res, next) {
    var startTime = 0;
    var endTime = (new Date).getTime();
    var id = req.params.userId; //TODO: Verify user has access to get this user's links
    client.zrevrangebyscore([ 'links:'+id, endTime, startTime ], function (err, response) {
        if (err)
            res.json({ "error": err });
            
        res.json({ "userId" : id, "links" : response });
    });
});

router.post('/links', function(req, res, next){
    var userId = req.body.userId; //TODO: Verify user has access to add to this user's links
    var stamp = (new Date).getTime();
    var url = req.body.url;
    client.zadd('links:'+userId, stamp, url);
	res.json({ "timestamp" : stamp, "url" : url });
});

module.exports = router;
