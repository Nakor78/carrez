var cheerio = require('cheerio'),
	fs = require('fs'),
	json = require('./meilleursAgentsSchema'),
 	url = './meilleursAgentsInfosWebPage';
  
function compare(data,callback)
{ 
	var $ = cheerio.load(fs.readFileSync(url,'utf8'));
	var price_m2 = data.properties.price / data.properties.surface;	
	var value = $('.small-4.medium-2.columns');
	value = value.slice(3);
	
	if (data.properties.type == "Appartement")
	{
		value = value.slice(0, 3);			
	}
	else if (data.properties.type == "Maison")
	{
		value = value.slice(3, 6);
	}
	else
	{
		value = value.slice(6);
	}
		
	json.properties.zip = data.properties.zip;
	json.properties.type = data.properties.type;
	json.properties.town = data.properties.town;
	json.properties.surface = data.properties.surface;
	json.properties.ini_price = data.properties.price;		
	json.properties.price.min = value[0].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");
	json.properties.price.averrage = value[1].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");
	json.properties.price.max = value[2].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");		
	json.properties.price_m2 = price_m2;
		
	if (price_m2 < json.properties.price.averrage)
	{
		json.properties.deal = 1;
	}
	else
	{
		json.properties.deal = 0;
	}	
	
	callback(null, json);	
}
	
exports.compare = compare;