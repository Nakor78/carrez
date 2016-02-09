var request = require('request'),
    cheerio = require('cheerio'),
 	fs = require('fs'),
	json = require('./leBonCoinSchema'),
	url = 'http://www.leboncoin.fr/locations/922350219.htm?ca=12_s';

function scrap(url,callback)
{  	
    var $ = cheerio.load(body);
		
    json.properties.price = parseInt($("[itemprop='price']").text().toString().replace(' ' ,''));
    json.properties.town = $("[itemprop='addressLocality']").text();
    json.properties.zip = $("[itemprop='postalCode']").text();
	
	var attribute = $("[class='lbcParams criterias']>table > tr >th");
	var table = $("[class='lbcParams criterias']>table > tr >td");    
	
	for (var i = 0; i < table.length; i++)
	{	
		if (attribute[i].children[0].data.indexOf('Surface') > -1)
		{
			json.properties.surface = parseInt(table[i].children[0].data);
		}
		else if (attribute[i].children[0].data.indexOf('Pi') > -1)
		{
			json.properties.room = table[i].children[0].data;
		}
		else if (attribute[i].children[0].data.indexOf('Type') > -1)
		{
			json.properties.type = table[i].children[0].data;
		}
	}	
	
	callback(null, json);	
}

exports.scrap = scrap;