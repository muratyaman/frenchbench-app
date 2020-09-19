import { ApolloServer, gql } from 'apollo-server-micro'

const typeDefs = gql`
  type Query {
    profiles: [Profile!]!
  }
  type Profile {
    _id: ID!
    email: String!
  }
`;

const resolvers = {
  Query: {
    profiles: async (parent, args, context) => {
      return [{ _id: '1', email: 'Nextjs' }];
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql2' });
