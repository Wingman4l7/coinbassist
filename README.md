coinbase-bot
============

## About ##
This is a node.js application to automatically buy/sell [Bitcoin] (BTC) via [Coinbase].

## How to Install ##

### node.js & dependencies ###
This needs [node.js] to work, so install that first.  This was tested & developed on v0.10.<i>x</i>.

Then, you will need to install the module dependencies.  Currently that is only [restler], *"an HTTP client library for node.js"*.  After installing node.js, run this command to do it:

	npm install restler

### Coinbase API key ###

You'll have to enable your Coinbase [API key] for this to work; you will of course have to be logged in to do this.  Once you've done that, paste your API key into your config file in the appropriate location.

**WARNING:** If you clone this repo so you can modify it, BE CAREFUL and DO NOT UPLOAD your config file with your API key in it!  This would allow someone to steal the Bitcoins from your Coinbase wallet!  

I personally recommend disabling your API key when you're not using this application as an extra safety measure.

## How to Run ##
For now, this is as simple as:

	node coinbase-bot.js

## How to Use ##
*If you can't figure it out on your own, never fear, I'll fill this in soon!*
*Notes:* If you want to just buy BTC and don't care to use the threshold to buy under/at a certain price, just set the theshold config value high enough so it won't matter.  The "min" and "max" values in the config aren't currently used anywhere.

## Origins & Credit Due ##
Initially cloned from [chenosaurus]' [buy.js Gist]; incorporated functionality from [FernandoEscher]'s [fork of same].  I used the JSON config file technique from [martindale]'s [coinbase-trader], and I'll probably be using other bits from it in the near future.  Lots of good stuff in [otakup0pe]'s [nodecoinbase] so there's probably going to be pieces from that in here as well.

## Donations ##
Like this script?  You can send Bitcoin donations to: `1F7kfMNUNQy8e52RHnQAWYXeaYfzFqHJAZ`

$1 USD is currently � <img src="http://btcticker.appspot.com/mtgox/1.00usd.png">

[Bitcoin]: http://bitcoin.org/
[Coinbase]: https://coinbase.com/
[node.js]: http://nodejs.org/
[restler]: https://github.com/danwrong/restler
[API key]: https://coinbase.com/account/integrations
[chenosaurus]: https://gist.github.com/chenosaurus
[buy.js Gist]: https://gist.github.com/chenosaurus/5102546
[FernandoEscher]: https://gist.github.com/FernandoEscher
[fork of same]: https://gist.github.com/FernandoEscher/5103601
[martindale]: https://github.com/martindale
[coinbase-trader]: https://github.com/martindale/coinbase-trader
[otakup0pe]: https://github.com/otakup0pe
[nodecoinbase]: https://github.com/otakup0pe/nodecoinbase