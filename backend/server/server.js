const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
require('dotenv').config({ path: '.env' });
const { connectToDB } = require('./dbserver');
const authMiddleware = require('../middleware/auth');
const cors = require('cors');

const port = process.env.PORT || 5000;

const authSchema = require('../schemas/authSchema');
const authResolvers = require('../resolvers/authResolver');
const profileResolvers = require('../resolvers/profileResolver');
const profileSchema = require('../schemas/profileSchema');
const verifyTokenResolver = require('../resolvers/verifyTokenResolver');
const verifyTokenSchema = require('../schemas/verifyTokenSchema');

const resolvers = mergeResolvers([authResolvers, profileResolvers, verifyTokenResolver]);
const typeDefs = mergeTypeDefs([authSchema, profileSchema, verifyTokenSchema]);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authResult = authMiddleware(req);
    return authResult;
  },
});

// Apply CORS middleware before applying Apollo middleware
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
// }));

server.start().then(() => {
  server.applyMiddleware({ app, path: "/graphql" });
  connectToDB();

  app.listen(port, () => {
    console.log(`API started on port ${port}`);
  });
});
