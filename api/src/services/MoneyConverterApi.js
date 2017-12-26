const axios = require('axios');

class MoneyConverterApi {

  constructor(){
    this.api = axios.create({
      baseURL: 'https://api.fixer.io'
    });
  }

  getCotacoes(b){

    const base = b || "USD";

    return this.api.get('/latest?base=' + base).then(response => {
      return response.data;
    }).catch(function (error) {
      return {message: error.response.data.message};
    });
  }

}

module.exports = MoneyConverterApi;