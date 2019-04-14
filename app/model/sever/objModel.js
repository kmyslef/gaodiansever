"use strict";

const Sequelize = require('sequelize');
const db = require('./../../db/mysql');

const objs = db.define('objs', {
    objid: {type: Sequelize.STRING(64),  primaryKey: true},
    title: {type: Sequelize.STRING(128)},
    des: {type: Sequelize.STRING(128)},
    url: {type: Sequelize.STRING(128)},
    price: {type: Sequelize.FLOAT(5,2)},
    cost: {type: Sequelize.FLOAT(5,2)}
}, {
    tableName: 'objs',
    timestamps: false,
    updatedAt: false
});


exports.insert = async param => await objs.build({
    objid: param.objid,
    title: param.title,
    des: param.des,
    url: param.url,
    price: param.price,
    cost: param.cost
}).save();