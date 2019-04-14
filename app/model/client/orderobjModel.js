"use strict";

const Sequelize = require('sequelize');
const db = require('./../../db/mysql');

const orderobj = db.define('orderobj', {
    orderid: {type: Sequelize.STRING(64),  primaryKey: true},
    objid: {type: Sequelize.STRING(64)},
    num: {type: Sequelize.INTEGER(32)}
}, {
    tableName: 'orderobj',
    timestamps: false,
    updatedAt: false
});


exports.insert = async param => await orderobj.build({
    orderid: param.orderid,
    num: param.num,
    objid: param.objid
}).save();