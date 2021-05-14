const { RESTDataSource } = require('apollo-datasource-rest');
const accessToken = require('./token');


class VisitsAPI extends RESTDataSource {
    constructor() {
      super();
      this.baseURL = 'http://localhost:5050';
    }
    willSendRequest(request) {
      const jwt = this.context.authorization.split(' ')
      request.headers.set('Authorization', jwt[1]);
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