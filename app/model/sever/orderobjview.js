"use strict";

const Sequelize = require('sequelize');
const db = require('./../../db/mysql');

const oderobjview = db.define('oderobjview', {
    orderid: {type: Sequelize.STRING(64)},
    title: {type: Sequelize.STRING(128)},
    num: {type: Sequelize.INTEGER(32)}
}, {
    tableName: 'oderobjview',
    timestamps: false,
    updatedAt: false
});

//没有主键，删除默认主键
oderobjview.removeAttribute('id');

exports.getall = async orderid => await oderobjview.findAll({
    where: {
        orderid: orderid
    }
});
