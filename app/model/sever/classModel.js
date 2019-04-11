"use strict";

const Sequelize = require('sequelize');
const db = require('./../../db/mysql');

const classify = db.define('classify', {
    classifyid: {type: Sequelize.STRING(64),  primaryKey: true},
    classifyname: {type: Sequelize.STRING(64)}
}, {
    tableName: 'classify',
    timestamps: false,
    updatedAt: false
});

exports.getall = async () => await classify.findAll();

exports.insert = async param => await classify.build({
    classifyid: param.classifyid,
    classifyname: param.classifyname
}).save();