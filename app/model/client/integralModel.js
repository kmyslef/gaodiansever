"use strict";

const Sequelize = require('sequelize');
const db = require('./../../db/mysql');

const integral = db.define('integral', {
    accountid: {type: Sequelize.STRING(64),  primaryKey: true},
    integral: {type: Sequelize.INTEGER(32)}
}, {
    tableName: 'integral',
    timestamps: false,
    updatedAt: false
});

exports.getOne = async accountid => await integral.findOne({
    where: {
        accountid: accountid
    }
});

exports.update1 = async (accountid, integral1) => await integral.update({integral: integral1}, {where: {accountid: accountid}});


exports.insert = async param => await integral.build({
    accountid: param.accountid,
    integral: param.integral
}).save();