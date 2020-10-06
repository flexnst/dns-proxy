const express = require('express');
const config = require('../../config/web.json');
const staticFiles = require('express').static;

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/',staticFiles(config.documentRoot));
    app.use(require('./ip_v4'));
    return app;
}