"use strict";

const fs = require('co-fs-extra');
const uuidv1 = require('uuid/v1');
const objsTable = require('./../../model/sever/objModel');
const tagobjTable = require('./../../model/sever/tagobjModel');
const classobjTable = require('./../../model/sever/classobjModel');

exports.add = async ctx => {
    const param = ctx.request.body;
    const uuid = uuidv1();

    await objsTable.insert({objid: uuid, title: param.title, des: param.des, url: param.url, price: param.price, cost: param.cost});
    try
    {
        for (let i = 0; i < param.classs; i++){
            await classobjTable.insert({classifyid: param.classifyid, objid: uuid});
        }
    }
    catch(err)
    {
        ctx.body = {res: '0', message: "分类与标签存储失败，请在产品详情补充"};
    }

    try
    {
        for (let i = 0; i < param.tags; i++){
            await tagobjTable.insert({tagid: param.tagid, objid: uuid});
        }
    }
    catch(err)
    {
        ctx.body = {res: '0', message: "标签存储失败，请在产品详情补充"};
    }

    ctx.body = {res: '1'};
}
