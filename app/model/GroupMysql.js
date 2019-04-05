"use strict";

const Sequelize = require('sequelize');
const db = require('./../db/mysql');

const group = db.define('group', {
    gid: {type: Sequelize.STRING(64),  primaryKey: true},
    gname: {type: Sequelize.STRING(128)},
    gdes: {type: Sequelize.STRING(256)}
}, {
    tableName: 'group',
    timestamps: false,
    updatedAt: false
});


exports.getall = async (pagesize, pageno) => await group.findAndCountAll({
    limit: pagesize,
    offset: pageno
});

exports.insert = async param => await group.build({
    gid: param.gid,
    gname: param.gname,
    gdes: param.gdes
}).save();



