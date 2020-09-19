import { buildSchema } from 'graphql';

export function newGraphql({ config, db }) {

  const schema = buildSchema(`
  type Query {
    hello: String
    profiles(criteria: ProfilesCriteria): [Profile!]!
  }
  input ProfilesCriteria {
    skills: [ String! ]
  }
  type Profile {
    _id: ID!
    email: String!
  }
  type GqlError {
    message: String!
  }
`);

  class GqlError {
    message;
    constructor({ message = '' }) {
      this.message = message;
    }
  }

  class Profile {
    _id;
    email;
    constructor({ _id, email }) {
      this._id = _id;
      this.email = email;
    }
  }

  const rootValue = {
    hello: (parent, args, ctx) => {
      return 'Hello world! It is ' + (new Date()).toISOString() + ' here!';
    },
    profiles: async (parent, args, ctx) => {
      const profilesColl = db.collection('profiles');
      const cursor = profilesColl.find({});
      const items = [];
      function iterateFunc(doc) {
        console.debug('mongo doc', doc);
        items.push(new Profile(doc));
      }
      function errorFunc(err) { if (err) console.error('mongo error', err); }
      const result = await cursor.forEach(iterateFunc, errorFunc);
      console.log('cursor result', result);
      return items;
    },
  };

  return { schema, rootValue };
}