const request = require('request');
const cheerio = require('cheerio');
const config = require('./config/keys');
const mongoose = require('mongoose');
const express = require('express');
const helmet  = require('helmet');
const Crawler = require('./util/crawler');

// Connect to database
mongoose.connect(config.mongoURI,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', async() => {
    console.log('Mongoose default connection open to ' + config.mongoURI);
    const root = 'https://medium.com';
    const crawler = new Crawler(5,root);
    crawler.init();
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

const gracefulExit = function() {
    mongoose.connection.close(function () {
    console.log('Mongoose default connection with DB :' + config.mongoURI + ' is disconnected through app termination');
    process.exit(0);
    });
}

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);


// Setup server
const app = express();

// use helmet to protect app from some well known web vulnerabilities
app.use(helmet());

if(process.env.NODE_ENV!='ci'){
  const server = require('http').createServer(app);
  // Start server
  server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    //console.log(mongoose.connection.readyState);
  });
}
require('./config/setup')(app);
require('./routes/index')(app);

// Expose app
exports = module.exports = app;