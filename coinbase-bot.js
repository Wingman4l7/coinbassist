// https://github.com/Wingman4l7/coinbase-bot
 
var sys =    require('util');
var rest =   require('restler');
var config = require('./config');

var baseURL = 'https://coinbase.com/api/v1/';
var API_URL = '?api_key=' + config.apiKey;

// ANSI escape codes for coloring text on the command line
var red    = '\u001b[31m'
  , green  = '\u001b[32m'
  , yellow = '\u001b[33m'
  , blue   = '\u001b[34m'
  , purple = '\u001b[35m'
  , cyan   = '\u001b[36m'
  , bold   = '\u001b[1m'
  , reset  = '\u001b[0m';

// this works but is currently not user-accessible functionality
function getYourBalance() {
	rest.get(baseURL + 'account/balance' + API_URL).once('complete', function(data, res) {
		// parseFloat() chops off any trailing zeroes
		console.log(cyan + "Account Balance: " + reset + "%s %s", parseFloat(data.amount), data.currency);
	});
}

// this works but is currently not user-accessible functionality
 function getAddy() {
	rest.get(baseURL + 'account/receive_address' + API_URL).once('complete', function(data, res) {
		console.log(cyan + "Current Receiving Address: " + reset + "%s", data.address);
	});
}

// this works but is currently not user-accessible functionality
function makeNewAddy() {
	rest.post(baseURL + 'account/generate_receive_address' + API_URL).once('complete', function(data, res) {
		console.log(cyan + "New Receiving Address: " + reset + "%s", data.address);
	});
}
 
// this works but is currently not user-accessible functionality
function exitMsg() {
	console.log(green + "Thanks for using Coinbase Bot!" + reset);
	process.exit();
}

// this works but is currently not user-accessible functionality	
function displayHelp() {
	console.log(cyan + 'Commands:\n' + reset +
				'\n	' + "'balance': shows your current account balance (in BTC)" + 
				'\n	' + "'quit', 'exit': does what it says on the tin" + 
				'\n	' + "'getaddy': shows your current receive address" +
				'\n	' + "'newaddy': generates & displays a new receive address"				
	);
}
 
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
		// TODO: append "@ XYZ ea." to output
	}
};
 
function buy() {
	// check the price until it reaches the desired value
	rest.get(baseURL + 'prices/buy').on('complete', function(data){
		console.log("Current price: " + data.amount + ". Buy-at price: " + config.threshold)

		if(data.amount <= config.threshold) {
			var jsonData = { qty: config.qty };
			rest.postJson(baseURL + 'buys' + API_URL, jsonData).once('complete', onComplete);
		}
		else {
			setTimeout(buy, config.timeout);
		}
		return
	});
}

buy();