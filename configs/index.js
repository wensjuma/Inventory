const express = require('express');
const setRoutes = require('./routes')
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
setRoutes(app) 
module.exports = app;