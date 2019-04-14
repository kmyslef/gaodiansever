"use strict";

const fs = require('co-fs-extra');
const uuidv1 = require('uuid/v1');
const objsTable = require('./../../model/sever/objModel');
const tagobjTable = require('./../../model/sever/tagobjModel');
const classobjTable = require('./../../model/sever/classobjModel');

exports.add = async ctx => {
    const param = ctx.request.body;
    const uuid = uuidv1();

    const price = parseFloat(param.price);
    const cost = parseFloat(param.cost);
    await objsTable.insert({objid: uuid, title: param.title, des: param.des, url: param.url, price: price, cost: cost});
    try
    {
        for (let i = 0; i < param.classs.length; i++){
            const clid = param.classs[0];
            await classobjTable.insert({classifyid: clid, objid: uuid});
        }
    }
    catch(err)
    {
        ctx.body = {res: '0', message: "分类与标签存储失败，请在产品详情补充"};
    }

    try
    {
        for (let i = 0; i < param.tags.length; i++){
            const tid = param.tags[0];
            await tagobjTable.insert({tagid: tid, objid: uuid});
        }
    }
    catch(err)
    {
        ctx.body = {res: '0', message: "标签存储失败，请在产品详情补充"};
    }

    ctx.body = {res: '1'};
}
