"use strict";

const sequelize = require('./../db/mysql');
const uuidv1 = require('uuid/v1');
const appleinfo = require('./../model/AppleInfoMysql');
const appleview = require('./../model/AppleInfoView');
const iosres = require('./../model/IOSRes');
const appletype = require('./../model/AppleTypeMysql');

//获取证书列表
exports.getlist = async ctx => {
    const  query = ctx.request.query;
    let rlt = await appleview.getall(query.pid);
    ctx.body = rlt.rows;
}

//添加证书
exports.add = async ctx => {
    const param = ctx.request.body;
    const uuid = uuidv1();

    try
    {
        await sequelize.transaction(function (t) {
            return appleinfo.insert({uid: uuid, p12path: param.p12path, p12pasw: param.p12pasw, propath: param.propath, des: param.des, type: param.type}, { transaction: t}).then(function (protab) {

                return iosres.insert({pid: param.pid, appleid: uuid}, { transaction: t});
            });
        })

        ctx.body = {res: 'ok'};
    }
    catch(err)
    {
        //在这里处理错误
        throw new Error("储存失败");
    }
}

//获取证书类型二级代码
exports.gettype = async ctx => {
    let rlt = await appletype.getall();
    ctx.body = rlt;
}