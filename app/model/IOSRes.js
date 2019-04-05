"use strict";

const Sequelize = require('sequelize');
const db = require('./../db/mysql');

const ios = db.define('iosres', {
    pid: {type: Sequelize.STRING(64)},
    appleid: {type: Sequelize.STRING(64)}
}, {
    tableName: 'iosres',
    timestamps: false,
    updatedAt: false
});

//没有主键，删除默认主键
ios.removeAttribute('id');


exports.insert = async param => await ios.build({
    pid: param.pid,
    appleid: param.appleid
}).save();