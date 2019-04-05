"use strict";

const Sequelize = require('sequelize');
const db = require('./../db/mysql');

const iprhistory = db.define('iprhistory', {
    hid: {type: Sequelize.STRING(64),  primaryKey: true},
    pid: {type: Sequelize.STRING(64)},
    downadr: {type: Sequelize.STRING(256)},
    time: {type: Sequelize.DATE},
    version: {type: Sequelize.STRING(128)}
}, {
    tableName: 'iprhistory',
    timestamps: false,
    updatedAt: false
});

// exports.update = async (hid, downadr, installadr) => await ipr00history.update({downadr: downadr, installadr: installadr}, {
//     where: {
//         hid: hid
//     }
// });

exports.insert = async param => await iprhistory.build({
    hid: param.hid,
    pid: param.pid,
    downadr: param.downadr,
    time: param.time,
    version:param.version
}).save();