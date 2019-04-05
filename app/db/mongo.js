"use strict";
/**
 * Create Date: 2018-07-31,19:43
 * Created by MengLei.
 * Description: .
 */
const mongoose = require('mongoose');
const config = require('config');

let mongoConf = config.get("mongodb");

let uri = "";
if (!!mongoConf.get("uri")) {
    uri = mongoConf.get("uri");
} else {
    uri = `mongodb://${mongoConf.get("host")}${!!mongoConf.get("port") ? (":" + mongoConf.get("port")) : ""}/${mongoConf.get("db")}`;
}

let opt = {useNewUrlParser: true};
if (!!mongoConf.get("username")) {
    opt['user'] = mongoConf.get("username");
}
if (!!mongoConf.get("password")) {
    opt['pass'] = mongoConf.get("password");
}
Object.assign(opt, mongoConf.get("option"));

module.exports = mongoose.createConnection(uri, opt);

