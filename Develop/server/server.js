const express = require('express');
const path = require('path');
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4');


const { typeDefs, resolvers } = require('./schemas');  // Import typeDefs and resolvers from schemas folder
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

// Create a new Apollo server instance for Apollo 2.x
const server = new ApolloServer({
  typeDefs,
  resolvers, // Example for passing headers to context
});

const app = express();  

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
