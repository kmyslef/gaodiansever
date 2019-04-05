"use strict";
/**
 * Create Date: 2018-08-01,18:30
 * Created by MengLei.
 * Description: .
 */


const Sequelize = require('sequelize');
const db = require('./../db/mysql');

const Hello = db.define('hello', {
    id: {type: Sequelize.STRING(64), allowNull: false, unique: false, primaryKey: true},
    name: {type: Sequelize.STRING(64), allowNull: false, defaultValue: ''},
    detail: {type: Sequelize.STRING(64), allowNull: false, defaultValue: ''},
    count: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0}
}, {
    tableName: 'hello',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false,
    indexes: [{
        name: 'timestamp_1',
        method: 'BTREE',
        fields: ['createdAt'],
    }]
});

exports.getById = async id => await Hello.findOne({where: {id: id}});

exports.getByName = async name => await Hello.findAll({where: {name: name}});

exports.list = async () => await Hello.find();

exports.insert = async param => await Hello.build({
    id: param.id,
    name: param.name,
    detail: param.detail,
    count: param.count
}).save();

exports.inc = async id => {
    let h = await Hello.findOne({where: {id: id}});
    return await h.increment({'count': 1})
};


