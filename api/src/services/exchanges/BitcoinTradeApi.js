const axios = require('axios');

class BitcoinTradeApi {

  constructor(coin){
    this.coin = coin || "BTC";
    
    this.api = axios.create({
      baseURL: 'https://api.bitcointrade.com.br'
    });
  }

  ticker(){
    return this.api.get('/v1/public/' + this.coin + '/ticker/').then(response => {
      return {ticker: response.data.data};
    }).catch(function (error) {
      return {message: error.response.data.message};
    });
  }

}

module.exports = BitcoinTradeApi;