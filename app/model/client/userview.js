"use strict";

const Sequelize = require('sequelize');
const db = require('./../../db/mysql');

const userview = db.define('userview', {
    accountid: {type: Sequelize.STRING(64),  primaryKey: true},
    openid: {type: Sequelize.STRING(64)},
    unitid: {type: Sequelize.STRING(64)},
    nick: {type: Sequelize.STRING(64)},
    phone: {type: Sequelize.STRING(64)},
    gender: {type: Sequelize.STRING(2)},
    avatarUrl: {type: Sequelize.STRING(256)},
    token: {type: Sequelize.STRING(64)}
}, {
    tableName: 'userview',
    timestamps: false,
    updatedAt: false
});

exports.getuser = async token => await userview.findOne({
    where: {
        token: token
    }
});