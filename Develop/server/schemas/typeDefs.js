const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]  # This field stores the user's saved books
  }

  type Book {  # Defines the structure of each book
    bookId: ID!
    title: String!
    authors: [String]
    description: String
    image: String
    link: String
  }

  type Auth {  # The Auth type for handling authentication (token + user)
    token: ID!
    user: User
  }

  # Root query for fetching user data (logged-in user)
  type Query {
    me: User  # Fetch the logged-in user's information
  }

  # Mutations for managing user actions
  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth  # Create a new user and return auth token
    login(email: String!, password: String!): Auth  # Login and return auth token
    saveBook(bookId: ID!, title: String!, authors: [String], description: String, image: String, link: String): User  # Save a book to the user's savedBooks
    deleteBook(bookId: ID!): User  # Delete a book from the user's savedBooks
  }
`;

module.exports = typeDefs;
