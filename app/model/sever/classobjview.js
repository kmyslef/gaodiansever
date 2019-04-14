"use strict";

const Sequelize = require('sequelize');
const db = require('./../../db/mysql');

const classobjview = db.define('classobjview', {
    classifyid: {type: Sequelize.STRING(64)},
    classifyname: {type: Sequelize.STRING(64)},
    objid: {type: Sequelize.STRING(64)},
    title: {type: Sequelize.STRING(128)},
    des: {type: Sequelize.STRING(128)},
    url: {type: Sequelize.STRING(128)},
    price: {type: Sequelize.FLOAT(5,2)},
    tags: {type: Sequelize.STRING(1024)},
}, {
    tableName: 'classobjview',
    timestamps: false,
    updatedAt: false
});

//没有主键，删除默认主键
classobjview.removeAttribute('id');

exports.getall = async classifyid => await classobjview.findAll({
    where: {
        classifyid: classifyid
    }
});

