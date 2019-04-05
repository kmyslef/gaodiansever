"use strict";

const Sequelize = require('sequelize');
const db = require('./../db/mysql');

const apple = db.define('appleres', {
    uid: {type: Sequelize.STRING(64),  primaryKey: true},
    p12path: {type: Sequelize.STRING(64)},
    p12pasw: {type: Sequelize.STRING(128)},
    propath: {type: Sequelize.STRING(64)},
    des: {type: Sequelize.STRING(128)},
    type: {type: Sequelize.STRING(32)}
}, {
    tableName: 'appleres',
    timestamps: false,
    updatedAt: false
});


exports.getinfo = async appleid => await apple.findOne({
    where: {
        uid: appleid
    }
});

exports.insert = async param => await apple.build({
    uid: param.uid,
    p12path: param.p12path,
    p12pasw: param.p12pasw,
    propath: param.propath,
    des: param.des,
    type: param.type
}).save();