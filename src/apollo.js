// const { RESTDataSource } = require('apollo-datasource-rest');
const { ApolloServer, gql } =  require('apollo-server');
const VisitsAPI = require('./classe');

const resolvers = {
    Query: {
      load: async (_,__, {dataSources}) => {
  
        return await dataSources.visitsApi.load_()
      }
    },
    Mutation:{
      visits: async(_, { siteId, propertyReference, visitDate }, { dataSources }) => {
        return await dataSources.visitsApi.add(siteId, propertyReference, visitDate )
      }
  }
  };

const typeDefs = gql`    
  type Visit {
    id: String,
    siteId: Int,
    propertyReference: String,
    visitDate: Int,
    status: String
    }

  type Query {

    load: [Visit]
  }

  type Mutation {
    visits(siteId: String, propertyReference: String, visitDate: String): String
  }

`;

const context = ({req , connection}) => {
  return req.headers
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources:() => ({
    visitsApi: new VisitsAPI()
  }),
  context
});


server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});