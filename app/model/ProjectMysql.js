"use strict";

const Sequelize = require('sequelize');
const db = require('./../db/mysql');

const prject = db.define('project', {
    pid: {type: Sequelize.STRING(64),  primaryKey: true},
    pname: {type: Sequelize.STRING(128)},
    pdes: {type: Sequelize.STRING(256)},
    gid: {type: Sequelize.STRING(64)},
    ptype: {type: Sequelize.STRING(32)}
}, {
    tableName: 'project',
    timestamps: false,
    updatedAt: false
});


exports.getall = async (pagesize, pageno) => await prject.findAndCountAll({
    limit: pagesize,
    offset: pageno
});

exports.getPreject = async (pid) => await prject.findOne({
    where: {
        pid: pid
    }
});

exports.getallInGroup = async (gid) => await prject.findAndCountAll({
    where: {
        gid: gid
    }
});

exports.insert = async (param, options) => await prject.build({
    pid: param.pid,
    pname: param.pname,
    pdes: param.pdes,
    ptype: param.ptype,
    gid: param.gid
}, options).save();



exports.update = async (param, tname) =>  prject.update({ pname: param.pname, pdes: param.pdes, ptype: param.ptype }, { where: { pid: param.pid }, transaction: tname});