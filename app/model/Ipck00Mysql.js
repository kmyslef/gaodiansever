"use strict";

const Sequelize = require('sequelize');
const db = require('./../db/mysql');

const ipr00 = db.define('ipr00', {
    pid: {type: Sequelize.STRING(64),  primaryKey: true},
    gitpath: {type: Sequelize.STRING(256)},
    gitpassword: {type: Sequelize.STRING(32)},
    gitusername: {type: Sequelize.STRING(32)}
}, {
    tableName: 'ipr00',
    timestamps: false,
    updatedAt: false
});


exports.getall = async (pagesize, pageno) => await ipr00.findAndCountAll({
    limit: pagesize,
    offset: pageno
});

exports.getinfo = async pid => await ipr00.findOne({where: {pid: pid}});

exports.insert = async (param, options) => await ipr00.build({
    pid: param.pid,
    gitpath: param.gitpath,
    gitpassword: param.gitpassword,
    gitusername: param.gitusername
}, options).save();

exports.update = async (param, tname) =>  ipr00.update({ gitpath: param.gitpath, gitpassword: param.gitpassword, gitusername: param.gitusername }, { where: { pid: param.pid }, transaction: tname});