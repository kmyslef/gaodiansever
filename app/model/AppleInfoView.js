"use strict";

const Sequelize = require('sequelize');
const db = require('./../db/mysql');

const iosview = db.define('iosresview', {
    pid: {type: Sequelize.STRING(64)},
    appleid: {type: Sequelize.STRING(64)},
    p12path: {type: Sequelize.STRING(64)},
    p12pasw: {type: Sequelize.STRING(128)},
    propath: {type: Sequelize.STRING(64)},
    des: {type: Sequelize.STRING(128)},
    type: {type: Sequelize.STRING(32)}
}, {
    tableName: 'iosresview',
    timestamps: false,
    updatedAt: false
});

//没有主键，删除默认主键
iosview.removeAttribute('id');

exports.getall = async pid => await iosview.findAndCountAll({
    where: {
        pid: pid
    }
});

exports.getallInCode = async pid => await iosview.findAll({
    attributes: [['des', 'name'], ['appleid', 'code']],
    where: {
        pid: pid
    }
});
