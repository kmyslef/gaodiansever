"use strict";

const Sequelize = require('sequelize');
const db = require('./../db/mysql');

const ipr00history = db.define('ipr00history', {
    hid: {type: Sequelize.STRING(64),  primaryKey: true},
    tag: {type: Sequelize.STRING(32)},
    appleid: {type: Sequelize.STRING(64)},
    brance: {type: Sequelize.STRING(128)}
}, {
    tableName: 'ipr00history',
    timestamps: false,
    updatedAt: false
});


exports.insert = async param => await ipr00history.build({
    hid: param.hid,
    tag: param.tag,
    appleid: param.appleid,
    brance: param.brance
}).save();