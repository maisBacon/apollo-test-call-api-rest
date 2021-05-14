const { RESTDataSource } = require('apollo-datasource-rest');
const accessToken = require('./token');


class VisitsAPI extends RESTDataSource {
    constructor() {
      super();
      this.baseURL = 'http://localhost:5050';
    }
    willSendRequest(request) {
      request.headers.set('Authorization', accessToken);
    }
  
    async add(siteId , propertyReference, visitDate) {
      return this.post('/',{
        siteId: siteId,
        propertyReference: propertyReference,
        visitDate: visitDate
      }
    )
  }

  async load_() {
    return this.get('/')
  }
}

  module.exports = VisitsAPI