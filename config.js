module.exports = {
    debug: false
  , logging: true // set to false to turn off
  , logfile: 'coinbassist.log'
  , apiKey: 'insert Coinbase API key here'
  , timeout: 60000 // in milliseconds; 60k = 1 minute
  , min: 50  // in USD
  , max: 100 // in USD
  , threshold: 50 // in USD
  , qty: 0 // in BTC
}