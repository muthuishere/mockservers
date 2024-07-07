import jsonServer from 'json-server';
import jwt from 'jsonwebtoken';
import express from 'express';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const SECRET_KEY = '123456789';
const expiresIn = '1h';

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

// Check if the user exists in database
function isAuthenticated({ username, password }) {
  const userdb = router.db.get('users').value();
  return userdb.findIndex(user => user.username === username && user.password === password) !== -1;
}

server.use(middlewares);
server.use(express.json());

// Authentication endpoint
server.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!isAuthenticated({ username, password })) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const user = router.db.get('users').find({ username }).value();
  const token = createToken({ id: user.id, username: user.username });
  res.status(200).json({ token });
});

// Middleware to protect routes
server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (req.headers.authorization == null || !req.headers.authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Error in authorization format' });
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    verifyToken(token);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is invalid' });
  }
});

server.use(router);

const mockPort=4632;

server.listen(mockPort ,() => {
  console.log('JSON Server is running on http://localhost:'+mockPort);
});







