const path = require('path');
const hapi = require('hapi');
const vision = require('vision');
const inert = require('inert');
const routes = require('./routes');
const cookieAuth = require('hapi-auth-cookie');

const server = new hapi.Server();

server.connection({
  port: process.env.PORT || 8000,
  routes: {
    files: {
      relativeTo: path.join(__dirname, '..', 'public')
    }
  }
});

server.register([inert, vision, cookieAuth], err => {
  if(err) console.log(err);

  server.auth.strategy('base', 'cookie', {
    password: 'm!*"2/),p4:xDs%KEgVr7;e#85Ah^WYC',
    cookie: 'user',
    isSecure: false
  });

  server.views({
    engines: {
      hbs: require('handlebars')
    },
    relativeTo: path.join(__dirname, '..', 'public'),
    layoutPath: 'layout',
    layout: 'default',
    path: 'views'
  });

  server.route(routes);
});

module.exports = server;
