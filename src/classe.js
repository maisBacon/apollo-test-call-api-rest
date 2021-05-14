const { RESTDataSource } = require('apollo-datasource-rest');


class SquareAPI extends RESTDataSource {
    constructor() {
      super();
      this.baseURL = 'http://localhost:3333/';
    }
  
    async calc(meters , value) {
      return this.get(`?meters=${meters}&value=${value}`);
    }
  }

  module.exports = SquareAPI