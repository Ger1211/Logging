var winston  = require('winston');
var {Loggly} = require('winston-loggly-bulk');
const token = require('./token.json')

const loggly = winston.add(new Loggly({
    token: token.accessToken,
    subdomain: "unqfy3",
    tags: ["Winston-NodeJS"],
    json: true
}));

module.exports = loggly;