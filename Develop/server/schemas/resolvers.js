const UserController = require('../controllers/user-controller');
const { authMiddleware } = require('../utils/auth');

const resolvers = {
  Query: {
    // Fetch the logged-in user's details
    me: async (_, __, context) => {
      if (context.user) {
        return await UserController.getSingleUser({ user: context.user }, { status: () => ({ json: (data) => data }) });
      }
      throw new Error("Not authenticated");
    },
  },
  Mutation: {
    // Create a new user and return the token and user info
    createUser: async (_, { username, email, password }) => {
      return await UserController.createUser(
        { body: { username, email, password } },
        { status: () => ({ json: (data) => data }) }
      );
    },
    // Login an existing user and return the token and user info
    login: async (_, { email, password }) => {
      return await UserController.login(
        { body: { email, password } },
        { status: () => ({ json: (data) => data }) }
      );
    },
    // Save a book to the user's savedBooks array
    saveBook: async (_, { bookId, title, authors, description, image, link }, context) => {
      if (context.user) {
        const bookDetails = { bookId, title, authors, description, image, link };
        return await UserController.saveBook(
          { user: context.user, body: bookDetails },
          { status: () => ({ json: (data) => data }) }
        );
      }
      throw new Error("Not authenticated");
    },
    // Remove a book from the user's savedBooks array
    deleteBook: async (_, { bookId }, context) => {
      if (context.user) {
        return await UserController.deleteBook(
          { user: context.user, params: { bookId } },
          { status: () => ({ json: (data) => data }) }
        );
      }
      throw new Error("Not authenticated");
    },
  },
};

module.exports = resolvers;
