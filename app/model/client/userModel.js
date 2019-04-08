"use strict";

const Sequelize = require('sequelize');
const db = require('./../../db/mysql');

const user = db.define('user', {
    accountid: {type: Sequelize.STRING(64),  primaryKey: true},
    openid: {type: Sequelize.STRING(64)},
    unitid: {type: Sequelize.STRING(64)},
    nick: {type: Sequelize.STRING(64)},
    phone: {type: Sequelize.STRING(64)},
    gender: {type: Sequelize.STRING(2)},
    avatarUrl: {type: Sequelize.STRING(256)}
}, {
    tableName: 'user',
    timestamps: false,
    updatedAt: false
});

exports.getuser = async openid => await user.findOne({
    where: {
        openid: openid
    }
});

exports.update = async (accountid, nick, avatarUrl) => await user.update({
    nick:nick,
    avatarUrl:avatarUrl
},{
    where:{
        accountid:accountid
    }
});

exports.insert = async param => await user.build({
    accountid: param.accountid,
    openid: param.openid,
    unitid: param.unitid,
    nick: param.nick,
    phone: param.phone,
    gender: param.gender,
    avatarUrl: param.avatarUrl
}).save();