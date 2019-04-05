"use strict";

const Sequelize = require('sequelize');
const db = require('./../db/mysql');

const ptype = db.define('ptype', {
    code: {type: Sequelize.STRING(32),  primaryKey: true},
    des: {type: Sequelize.STRING(128)}
}, {
    tableName: 'ptype',
    timestamps: false,
    updatedAt: false
});


exports.getall = async () => await ptype.findAll();

exports.getallInCode = async () => await ptype.findAll({
    attributes: [['des', 'name'], ['code', 'code']]
});