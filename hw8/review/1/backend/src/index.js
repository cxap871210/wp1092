import { GraphQLServer, PubSub } from 'graphql-yoga';
import mongo from './mongo';
require('dotenv-defaults').config();

// import resolvers
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import ChatBox from './resolvers/ChatBox';
import Message from './resolvers/Message';

// import models
import UserModel from './models/User';
import ChatBoxModel from './models/ChatBox';
import MessageModel from './models/Message';

const db = {
    UserModel,
    ChatBoxModel,
    MessageModel,
};

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    ChatBox,
    Message,
  },
  context: {
    db,
    pubsub,
  },
});

mongo.connect();

server.start({ port: process.env.PORT || 8080 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 8080}!`);
});
