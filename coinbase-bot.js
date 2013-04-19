// https://github.com/Wingman4l7/coinbase-bot
 
var sys =  require('util');
var rest = require('restler');
 
function onComplete(data, res) {
	console.log(new Date().toString());
	if (!data.success) {
		//console.log(data.errors);
		attemptCount++;
		if(attemptCount%10 == 0) {  // only output every 10th attempt
			console.log(new Date().toString());
			// new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') // gives UTC; shorter
			console.log("Buy attempt # %s", attemptCount);
		}
		setTimeout(buy, config.timeout);
	}   
	else {
		console.log("SUCCESS! Bought %s BTC!", config.qty);
	}
};
 
function buy() {
	// check the price until it reaches the desired value
	rest.get('https://coinbase.com/api/v1/prices/buy').on('complete', function(data){
		console.log("Current price: " + data.amount + ". Buy-at price: " + config.threshold)
    
		if(data.amount <= config.threshold) {
			var jsonData = { qty: config.qty };
			rest.postJson('https://coinbase.com/api/v1/buys?api_key=' + config.apiKey, jsonData).once('complete', onComplete);
    	}
		else {
			setTimeout(buy, config.timeout);
	    }
    	return
	});
}

buy();