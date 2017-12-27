//const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
import BitcoinTradeApi from '../services/exchanges/bitcoinTradeApi';
//const BitcoinTradeApi = require('../services/exchanges/BitcoinTradeApi');
const MercadoBitcoinApi = require('../services/exchanges/MercadoBitcoinApi');
const BitfinexApi = require('../services/exchanges/BitfinexApi');

module.exports = app => {
  app.get('/exchanges', async (req, res) => {
    
    const bitcoinTradeApi = new BitcoinTradeApi("BTC");
    const mercadoBitcoinApi = new MercadoBitcoinApi("BTC");
    const bitfinexApi = new BitfinexApi("BTCUSD");

    const tickers = {};

    // busca tickers
    tickers['bitcoinTrade'] = await bitcoinTradeApi.ticker();
    tickers['mercadoBitcoin'] = await mercadoBitcoinApi.ticker();
    tickers['bitfinex'] = await bitfinexApi.ticker();
    
    // Melhor compra
    const bitcoinTradeBuy = tickers['bitcoinTrade'].ticker.buy;
    const mercadoBitcoinBuy = tickers['mercadoBitcoin'].ticker.buy;
    let melhorCompra = "Melhor compra: ";
    if(bitcoinTradeBuy < mercadoBitcoinBuy){
      melhorCompra += "Bitcoin Trade: " + bitcoinTradeBuy + " vs " + mercadoBitcoinBuy + " != " + (mercadoBitcoinBuy-bitcoinTradeBuy);
    }else{
      melhorCompra += "Mercado Bitcoin: " + mercadoBitcoinBuy + " vs " + bitcoinTradeBuy + " != " + (bitcoinTradeBuy-mercadoBitcoinBuy);
    }

    // Melhor venda
    const bitcoinTradeSell = tickers['bitcoinTrade'].ticker.sell;
    const mercadoBitcoinSell = tickers['mercadoBitcoin'].ticker.sell;
    let melhorVenda = "Melhor venda: ";
    if(bitcoinTradeSell > mercadoBitcoinSell){
      melhorVenda += "Bitcoin Trade: " + bitcoinTradeSell + " vs " + bitcoinTradeSell + " != " + (bitcoinTradeSell-mercadoBitcoinSell);
    }else{
      melhorVenda += "Mercado Bitcoin: " + mercadoBitcoinSell + " vs " + bitcoinTradeSell + " != " + (mercadoBitcoinSell-bitcoinTradeSell);
    }

    return res.json({tickers, melhorCompra, melhorVenda});

  });

};