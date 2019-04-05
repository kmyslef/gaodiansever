"use strict";
/**
 * Create Date: 2018-07-31,19:43
 * Created by MengLei.
 * Description: .
 */
const Redis = require("ioredis");
const config = require('config');

let redisConf = config.get("redis");

module.exports = new Redis({
    host: redisConf.get("host"),
    port: redisConf.get("port"),
    family: 4,
    db: redisConf.get("db"),
    password: redisConf.get("password") || ''
});

