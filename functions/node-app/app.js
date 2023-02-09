const express = require('express');
const app = express();
const indexRouter = require('./router/index');
const todoRouter = require('./router/todo')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/', indexRouter);

app.use('/todo', todoRouter);

module.exports = app;