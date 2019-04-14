const Sequelize = require('sequelize');
const db = require('./../../db/mysql');

const classobj = db.define('classobj', {
    classifyid: {type: Sequelize.STRING(64)},
    objid: {type: Sequelize.STRING(64)}
}, {
    tableName: 'classobj',
    timestamps: false,
    updatedAt: false
});

//没有主键，删除默认主键
classobj.removeAttribute('id');

exports.getall = async () => await classobj.findAll();

exports.insert = async param => await classobj.build({
    classifyid: param.classifyid,
    objid: param.objid
}).save();