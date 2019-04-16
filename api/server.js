const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const session = require('express-session');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const sessionConfig = {
  name: 'monkey', // the default would be sid but that would reveal our stack
  secret: 'keep it secret, keep it safe!' ,// to encrypt/decrypt the cookie
  cookie: {
    maxAge: 1000 * 60 * 60, // How long is the session valid for in milliseconds
    secure: false, // use over https only, should be true in production
  },
  httpOnly: true, // cannot access the cookie from JS using document.cookie
  // keep this true unless there is a good reason to let JS access the cookie
  resave: false ,// keep this false to avoid recreating sessions
  saveUnitialized: false, // GDPR laws against setting cookies automatically
}

server,use(session(sessionConfig));

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
