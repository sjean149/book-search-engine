const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

// Middleware to authenticate users based on token
const authMiddleware = (req) => {
  // Allows token to be sent via headers
  let token = req.headers.authorization || '';

  // Extract token value from Bearer scheme
  if (token.startsWith('Bearer ')) {
    token = token.split(' ').pop().trim();
  }

  // If no token, throw an error
  if (!token) {
    throw new Error('You have no token!');
  }

  // Verify token and get user data out of it
  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    return data; // Return user data to be included in the context
  } catch (err) {
    console.log('Invalid token', err);
    throw new Error('Invalid token!');
  }
};

// Function to sign token
const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { authMiddleware, signToken };
