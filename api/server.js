const express = require("express");

const accountRouter = require('../data/accounts/accountsRouter.js');

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use('/api/accounts', accountRouter)

module.exports = server;
