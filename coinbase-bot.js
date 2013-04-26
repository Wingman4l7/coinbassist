// https://github.com/Wingman4l7/coinbase-bot
 
var rest   = require('restler') // for HTTP requests
  , repl   = require('repl')    // for command-line interface
  , fs     = require('fs')      // for logging
  , config = require('./config');

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

function writeToLog(str) {
	if(config.logging) {
		var bareStr = str.replace(/\u001b\[[0-9;]*m/g, "");  // strip coloring characters from string
		var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''); // gives UTC
		fs.appendFileSync(config.logfile, date + ": " + bareStr + '\n');
	}
}
  
// API supports other exchange rates but as Coinbase only 
// currently does USD to BTC, no point in displaying them
function getRate(callback) {
	var market = { rates: {} };
	var response;
	rest.get(baseURL + 'currencies/exchange_rates').once('complete', function(data, res) {
		if(typeof market.rates.btc_to_usd == "undefined") {
			response = red + "RATE QUERY FAILED -- TRY AGAIN" + reset;
		}
		else {
			market.rates = data;
			response = cyan + 'BTC to USD: ' + reset + market.rates.btc_to_usd;
		}
		callback(response);
		writeToLog(response);
	});
}
 
function getBalance(callback) {
	var response;
	rest.get(baseURL + 'account/balance' + API_URL).once('complete', function(data, res) {
		if(typeof data.currency == "undefined") { // data.amount would return "NaN"
			response = red + "BALANCE QUERY FAILED -- TRY AGAIN" + reset;
		}
		else { // parseFloat() chops off any trailing zeroes
			response = cyan + "Account Balance: " + reset + parseFloat(data.amount) + " " + data.currency;
		}
		callback(response);
		writeToLog(response);		
	});
}

function getAddy(callback) {
	var response;
	rest.get(baseURL + 'account/receive_address' + API_URL).once('complete', function(data, res) {
		if(typeof data.address == "undefined") {
			response = red + "ADDRESS QUERY FAILED -- TRY AGAIN" + reset;
		}
		else {
			response = cyan + "Current Receiving Address: " + reset + data.address;
		}
		callback(response);
		writeToLog(response);
	});
}

function newAddy(callback) {
	var response;
	rest.post(baseURL + 'account/generate_receive_address' + API_URL).once('complete', function(data, res) {
		if(typeof data.address == "undefined") {
			response = red + "NEW ADDRESS REQUEST FAILED -- TRY AGAIN" + reset;
		}
		else {
			response = cyan + "New Receiving Address: " + reset + data.address;	
		}
		callback(response);
		writeToLog(response);
	});
}

function buyPrice(qty, callback) {
	var response;
	var jsonData = { 'qty': qty };
	rest.json(baseURL + 'prices/buy', jsonData).once('complete', function(data, res) {
		if(typeof data.currency == "undefined") { // data.amount would return "NaN"
			response = red + "BUY PRICE QUERY FAILED -- TRY AGAIN" + reset;
		}
		else { 
			response = cyan + "Buy Price: " + reset + data.amount + " " + data.currency;
		}
		callback(response);
		writeToLog(response);
	});
}

function sellPrice(qty, callback) {
	var response;
	var jsonData = { 'qty': qty };
	rest.json(baseURL + 'prices/sell', jsonData).once('complete', function(data, res) {
		if(typeof data.currency == "undefined") { // data.amount would return "NaN"
			response = red + "SELL PRICE QUERY FAILED -- TRY AGAIN" + reset;
		}
		else { 
			response = cyan + "Sell Price: " + reset + data.amount + " " + data.currency;
		}
		callback(response);
		writeToLog(response);
	});
}
 
function exitMsg() {
	console.log(green + "Thanks for using Coinbase Bot!" + reset);
	process.exit();
}

function displayHelp(callback) {
	callback(cyan + 'Commands:' + reset +
			'\n	' + yellow + "balance" + reset + ": shows your current account balance (in BTC)" + 
			'\n	' + yellow + "rate" + reset + ": shows their current exchange rate (BTC to USD)" + 
			'\n	' + yellow + "getaddy" + reset + ": shows your current receive address" +
			'\n	' + yellow + "newaddy" + reset + ": generates & displays a new receive address" + 
			'\n	' + yellow + "buyprice"  + reset + ": shows buy price incl. fees (use: buyprice #)" + 
			'\n	' + yellow + "sellprice" + reset + ": shows sell price incl. fees (use: sellprice #)" + 
			'\n	' + yellow + "quit / exit" + reset + ": does what it says on the tin"
	);
}

function displayStart() {
	console.log(green + 'Coinbase Bot:' + reset + 
						'\nA command-line tool for Coinbase.' + '\n');
	console.log(cyan + "Type '" + yellow + 'help' + cyan + "' for a complete list of commands." + reset);
}

function parseCmds(cmd, context, filename, callback) {
	var tokens = cmd.toLowerCase().replace('(','').replace(')','').replace('\n', '').split(' ');
		
	switch (tokens[0]) {
		case 'help':
			displayHelp(callback);
		break;
		case 'rate':
			writeToLog('rate');
			getRate(callback);
		break;
		case 'balance':
			writeToLog('balance');
			getBalance(callback);
		break;
		case 'getaddy':
			writeToLog('getaddy');
			getAddy(callback);
		break;
		case 'newaddy':
			writeToLog('newaddy');
			newAddy(callback);
		break;
		case 'buyprice':
			writeToLog('buyprice ' + tokens[1]);
			buyPrice(tokens[1], callback);  // assumes good input
		break;
		case 'sellprice':
			writeToLog('sellprice ' + tokens[1]);
			sellPrice(tokens[1], callback); // assumes good input			
		break;
		case 'quit': case 'exit':
			exitMsg();
		break;
		default:
			writeToLog(tokens[0]);
			writeToLog(red + 'unknown command: ' + reset + '"' + tokens[0] +'"');
			callback(red + 'unknown command: ' + reset + '"' + tokens[0] +'"');
		break;
	}
}

displayStart();

repl.start({
	prompt: 'coinbase-bot> ',
	eval : parseCmds
});

// this works but is currently not user-accessible functionality 
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
 
// this works but is currently not user-accessible functionality
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

// buy();