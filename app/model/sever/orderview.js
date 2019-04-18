"use strict";

const Sequelize = require('sequelize');
const db = require('./../../db/mysql');

const orderview = db.define('orderview', {
    orderid: {type: Sequelize.STRING(64)},
    totleprice: {type: Sequelize.FLOAT(5,2)},
    integral: {type: Sequelize.INTEGER(32)},
    actual: {type: Sequelize.FLOAT(5,2)},
    adress: {type: Sequelize.STRING(128)},
    deliverytime: {type: Sequelize.STRING(64)},
    ordertime: {type: Sequelize.DATE},
    accountid: {type: Sequelize.STRING(64)},
    ispay: {type: Sequelize.STRING(2)},
    nick: {type: Sequelize.STRING(64)},
    gender: {type: Sequelize.STRING(2)},
    avatarUrl: {type: Sequelize.STRING(256)}
}, {
    tableName: 'orderview',
    timestamps: false,
    updatedAt: false
});

//没有主键，删除默认主键
orderview.removeAttribute('id');

exports.getall = async (pagesize, pageno) => await orderview.findAll({
    order: [
            ['ordertime', 'DESC']
        ],
    limit: pagesize,
    offset: pageno
});

exports.getallNoPay = async (pagesize, pageno) => await orderview.findAll({
    order: [
        ['ordertime', 'DESC']
    ],
    limit: pagesize,
    offset: pageno,
    where: {
        ispay: "0"
    }
});
