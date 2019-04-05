"use strict";

const uuidv1 = require('uuid/v1');
const grouptab = require('./../model/GroupMysql');

//获取组列表
exports.getlist = async ctx => {
    const  query = ctx.request.query;
    const pagesize = parseInt(query.pagesize);
    const pageno = parseInt(query.pageno) * pagesize;
    let rlt = await grouptab.getall(pagesize, pageno);
    ctx.body = rlt;
}

//添加组信息
exports.add = async ctx => {
    const param = ctx.request.body;
    const uuid = uuidv1();
    await grouptab.insert({gid: uuid, gname: param.gname, gdes: param.gdes});

    ctx.body = {res: 'ok'};
}