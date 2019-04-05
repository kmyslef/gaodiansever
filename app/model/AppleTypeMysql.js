"use strict";

const Sequelize = require('sequelize');
const db = require('./../db/mysql');

const appletype = db.define('appletype', {
    code: {type: Sequelize.STRING(32),  primaryKey: true},
    des: {type: Sequelize.STRING(128)}
}, {
    tableName: 'appletype',
    timestamps: false,
    updatedAt: false
});


exports.getall = async () => await appletype.findAll();

exports.getallInCode = async () => await appletype.findAll({
    attributes: [['des', 'name'], ['code', 'code']]
});