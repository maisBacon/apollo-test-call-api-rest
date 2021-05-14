// const { RESTDataSource } = require('apollo-datasource-rest');
const { ApolloServer, gql } =  require('apollo-server');
const SquareAPI = require('./classe');

const resolvers = {
    Query: {
      get: async (_, args, context ) => {  
        return {
          name:'renan',
          years: 12
        }
      },
      square: async(_, { meters, value }, { dataSources }) => {
        return await dataSources.square.calc(meters, value)
      }
    }
  };

const typeDefs = gql`
  
  type User {
      name: String
      years: Int
    }
  type Query {
    get: User
    square(meters: String, value: String): String
  }
`;


const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources:() => ({
    square: new SquareAPI()
  })
});


server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});