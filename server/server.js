
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var app = express();

//User Imports
var lionRouter = require('./lions');
var tigerRouter = require('./tigers');

//App Level MiddleWare
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/lions', lionRouter);
app.use('/tigers', tigerRouter);

module.exports = app;