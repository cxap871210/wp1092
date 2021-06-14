import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db.js';
import mongo from './mongo.js'

import Query from './resolvers/Query.js';
import Mutation from './resolvers/Mutation.js';
import User from './resolvers/User.js';
import Message from './resolvers/Message.js';
import Chatbox from './resolvers/Chatbox.js';
import Subscription from './resolvers/Subscription.js';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers: {
    Query,
    Mutation,
    User,
    Message,
    Chatbox,
    Subscription,
  },
  context: {
    db,
    pubsub,
  },
});

mongo.connect();

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});
