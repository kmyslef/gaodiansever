"use strict";

const Sequelize = require('sequelize');
const db = require('./../../db/mysql');

const token = db.define('token', {
    accountid: {type: Sequelize.STRING(64),  primaryKey: true},
    token: {type: Sequelize.STRING(64)}
}, {
    tableName: 'token',
    timestamps: false,
    updatedAt: false
});

exports.getToken = async accountid => await token.findOne({
    where: {
        accountid: accountid
    }
});


exports.getAccountid = async token => await token.findOne({
    where: {
        token: token
    }
});

exports.insert = async param => await token.build({
    accountid: param.accountid,
    token: param.token
}).save();