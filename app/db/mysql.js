"use strict";
/**
 * Create Date: 2018-07-31,19:43
 * Created by MengLei.
 * Description: .
 */

const Sequelize = require('sequelize');
const config = require('config');

let mysqlConf = config.get("mysql");

module.exports = new Sequelize(
    mysqlConf.get("db"), mysqlConf.get('username'), mysqlConf.get('password'),
    {
        host: mysqlConf.get("host"),
        dialect: 'mysql',

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },

        // SQLite only
        storage: 'path/to/database.sqlite',

        // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
        operatorsAliases: false
    });

