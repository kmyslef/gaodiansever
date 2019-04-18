"use strict";

const Sequelize = require('sequelize');
const db = require('./../../db/mysql');

const orders = db.define('orders', {
    orderid: {type: Sequelize.STRING(64),  primaryKey: true},
    totleprice: {type: Sequelize.FLOAT(5,2)},
    integral: {type: Sequelize.INTEGER(32)},
    actual: {type: Sequelize.FLOAT(5,2)},
    adress: {type: Sequelize.STRING(128)},
    deliverytime: {type: Sequelize.STRING(64)},
    ordertime: {type: Sequelize.DATE},
    accountid: {type: Sequelize.STRING(64)},
    ispay: {type: Sequelize.STRING(2)}
}, {
    tableName: 'orders',
    timestamps: false,
    updatedAt: false
});

exports.updatepay = async (orderid, val) => await orders.update({ispay: val}, {
    where: {
        orderid: orderid
    }
});

exports.insert = async param => await orders.build({
    orderid: param.orderid,
    totleprice: param.totleprice,
    integral: param.integral,
    actual: param.actual,
    adress:param.adress,
    deliverytime:param.deliverytime,
    ordertime:param.ordertime,
    accountid:param.accountid,
    ispay:param.ispay
}).save();