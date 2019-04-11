"use strict";

const Sequelize = require('sequelize');
const db = require('./../../db/mysql');

const tags = db.define('tags', {
    tagid: {type: Sequelize.STRING(64),  primaryKey: true},
    tagname: {type: Sequelize.STRING(64)}
}, {
    tableName: 'tags',
    timestamps: false,
    updatedAt: false
});

exports.getall = async () => await tags.findAll();

exports.insert = async param => await tags.build({
    tagid: param.tagid,
    tagname: param.tagname
}).save();