coinbassist
===========

## About ##
This is a node.js application which provides command-line access to [Coinbase].

**This is in beta!  Parts of this may not be fully tested!**  ***Caveat Utilitor!***

### Current Capabilities ###

  - show current exchange rate
  - check your balance
  - show your current receive address  
  - generate & display a new receive address
  - show buy or sell price (incl. fees) for a given amount of BTC
  - send BTC to an email or Bitcoin address
  - sell BTC *(testing not completed)*
  - check the status of a transaction *(testing not completed)*

It will also optionally log all your actions to a text file.

### Coming Soon ###

  - command confirmations (i.e. *"Are you sure you want to do that?"*)
  - automatic transfer of incoming BTC to a designated external account
  - automatic sell of incoming BTC
  - [automatic] buy command
  - support for price floor & ceiling in buy/sell orders
  - check your daily buy/sell limit & support for this limit in buy/sell commands
  - support for transferring / selling / buying in USD amounts
  - support for custom fee amounts
  - listing / exporting your transaction and transfer histories
  - displaying / setting user info
  - requesting money from an email address

*Not necessarily to be implemented in this order.*

## How to Install ##

### node.js & dependencies ###
This needs [node.js] to work, so install that first; coinbassist was tested & developed on v0.10.<i>x</i> of node.js.

Then, you will need to install the module dependencies.  Currently that is only [restler], *"an HTTP client library for node.js"*.  After installing node.js, run this command to do it:

    npm install restler

### Coinbase API key ###

You'll have to enable your Coinbase [API key] for this to work; you will of course have to be logged in to do this.  Once you've done that, paste your API key into your config file in the appropriate location.

**WARNING:** If you clone this repo so you can modify it, BE CAREFUL and DO NOT UPLOAD your config file with your API key in it!  This would allow someone to steal the Bitcoins from your Coinbase wallet!  

I personally recommend disabling your API key when you're not using this application as an extra safety measure.

## How to Run ##
For now, this is as simple as:

	node coinbassist.js

## How to Use ##

### Commands ###
You are provided with a command prompt.  Current available commands are:

  - `help`:    gives a complete list of commands and what they do
  - `rate`:    shows their current exchange rate (BTC to USD)
  - `balance`: shows your current account balance (in BTC)
  - `getaddy`: shows your current receive address
  - `newaddy`: generates & displays a new receive address
  - `buyprice`:  shows buy price incl. fees (use: `buyprice <# amount>`)
  - `sellprice`: shows sell price incl. fees (use: `sellprice <# amount>`)
  - `status`:  shows the status of a transaction (use: `status <TXN_ID>`)
  - `transfer`: send BTC to an email or Bitcoin address (use: `transfer <# amount> <address> <optional note>`)
  - `sell`: sells BTC (use: `sell <amount in BTC>`)
  - `quit` / `exit`: does what it says on the tin

There is currently **NO** command confirmation -- so be careful!

### Config File ###
This is where you'll put the API key and set other options, like if you want logging on *(set to `true`)* or off *(set to `false`)*.

If you want to just buy BTC and don't care to use the threshold to set a price ceiling, just set the config value high enough so it won't matter.  The "min" and "max" values in the config aren't currently used anywhere.  In any case, you'll have to wait until I put a `buy` command back in!

## Origins & Credit Due ##
Initially cloned from [chenosaurus]' [buy.js Gist]; incorporated threshold functionality from [FernandoEscher]'s [fork of same].*  I used the JSON config file and REPL-as-command-line from [martindale]'s [coinbase-trader], and I'll probably be using other bits from it in the near future.

Credit goes to [AlliedEnvy] for the clever name.

*
*Funny, really -- the only thing this can do is an automatic buy, which is one of the few things coinbassist can't currently do!  Blame the inclusion of the REPL for temporarily decomissioning that functionality.*

## License ##
I haven't bothered to formally declare which license this is going to be under, but it's obviously open-source, and it will probably be some flavor of [Creative Commons], or maybe [GPL].

## Donations ##
Like this script?  You can send Bitcoin donations to: `1F7kfMNUNQy8e52RHnQAWYXeaYfzFqHJAZ`

Alternatively, you can use [Gittip](https://www.gittip.com/Wingman4l7/).

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
[AlliedEnvy]: https://github.com/AlliedEnvy
[Creative Commons]: http://creativecommons.org/licenses/
[GPL]: http://www.gnu.org/licenses/licenses.html
