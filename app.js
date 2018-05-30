const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { createTable } = require('./db/query');
const { usersTableColumns, usersPostColumns } = require('./constants/dbColumns.js');
const api = require('./routes/api');

// Creating tables if it's needed
createTable('customers', usersTableColumns);
createTable('posts', usersTableColumns);

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

module.exports = app;
