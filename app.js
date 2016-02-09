var express = require('express');
var leboncoin = require('./leBonCoinSchema');
var agents = require('./meilleursAgentsSchema');
var host = '127.0.0.1';
var port = 8080;
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.render('index');
});

app.post('/url', function (req, res) {
 	var url = req.body.url;
 
 	leboncoin.scrap(url, function (err, data) {			
		agents.compare(data, function (err, data) {
			if (err == null)
			{
				var finalRes = { finalRes: data	};
				res.json(finalRes);
			}
			else
			{
				res.json({message: 'Oups! There is an error'});
			}			
		});
	});
});

app.listen(port,function () {
	console.log('Litstenning');
	console.log('The server is ready');
});
