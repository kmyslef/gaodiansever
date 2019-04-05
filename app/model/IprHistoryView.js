"use strict";

const Sequelize = require('sequelize');
const db = require('./../db/mysql');

const iprhistoryview = db.define('iprhistoryview', {
    hid: {type: Sequelize.STRING(64),  primaryKey: true},
    pid: {type: Sequelize.STRING(64)},
    downadr: {type: Sequelize.STRING(256)},
    time: {type: Sequelize.DATE},
    version: {type: Sequelize.STRING(128)},
    info: {type: Sequelize.STRING(1024)}

}, {
    tableName: 'iprhistoryview',
    timestamps: false,
    updatedAt: false
});


exports.getall = async (pid, pagesize, pageno) => await iprhistoryview.findAll({
    where: {
        pid: pid
    },
    limit: pagesize,
    offset: pageno
});


exports.getone = async (hid) => await iprhistoryview.findOne({
    where: {
        hid: hid
    }
});