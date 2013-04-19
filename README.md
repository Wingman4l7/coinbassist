coinbase-bot
============

## About ##
This is a node.js application to automatically buy/sell BTC via Coinbase.

## How to Install ##

### node.js & dependencies ###
This needs node.js to work, so install that first.  You can find it [here] [1].  This was tested & developed on v0.10.*x*.

Then, you will need to install the module dependencies.  Currently that is only [restler], *"an HTTP client library for node.js"*.  After installing node.js, run this command to do it:

    npm install restler
	
## How to Run ##
For now, this is as simple as:

    node coinbase-bot.js

### Coinbase API key ###

You'll have to enable your Coinbase [API key] for this to work; you will of course have to be logged in to do this.  Once you've done that, paste your API key into your config file in the appropriate location.

<span style="color:red">**WARNING:**</span> If you clone this repo so you can modify it, BE CAREFUL and DO NOT UPLOAD your config file with your API key in it!  This would allow someone to steal the Bitcoins from your Coinbase wallet!  

I personally recommend disabling your API key when you're not using this application as an extra safety measure.

## Origins ##
Initially cloned from [chenosaurus]' [buy.js Gist]; incorporated functionality from [FernandoEscher]'s [fork of same].

I used the JSON config file technique from [martindale]'s [coinbase-trader], and I'll probably be using other bits from it in the near future.

## Donations ##
Like this script?  You can send Bitcoin donations to: `1F7kfMNUNQy8e52RHnQAWYXeaYfzFqHJAZ`

As a benchmark, $1 USD is currently: <img src="http://btcticker.appspot.com/mtgox/1.00usd.png">

[1]: http://nodejs.org/
[restler]: https://github.com/danwrong/restler
[API key]: https://coinbase.com/account/integrations
[chenosaurus]: https://gist.github.com/chenosaurus
[buy.js Gist]: https://gist.github.com/chenosaurus/5102546
[FernandoEscher]: https://gist.github.com/FernandoEscher
[fork of same]: https://gist.github.com/FernandoEscher/5103601
[martindale]: https://github.com/martindale
[coinbase-trader]: https://github.com/martindale/coinbase-trader