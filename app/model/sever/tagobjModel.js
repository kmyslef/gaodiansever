const Sequelize = require('sequelize');
const db = require('./../../db/mysql');

const tagobj = db.define('tagobj', {
    tagid: {type: Sequelize.STRING(64)},
    objid: {type: Sequelize.STRING(64)}
}, {
    tableName: 'tagobj',
    timestamps: false,
    updatedAt: false
});

//没有主键，删除默认主键
iosview.removeAttribute('id');

exports.getall = async () => await tagobj.findAll();

exports.insert = async param => await tagobj.build({
    tagid: param.tagid,
    objid: param.objid
}).save();