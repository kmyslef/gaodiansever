"use strict";

const fs = require('co-fs-extra');
const uuidv1 = require('uuid/v1');
const tagTable = require('./../../model/sever/tagModel');


exports.addTag = async ctx => {

    const body = ctx.request.body;

    const name = body.name;
    const uid = uuidv1();

    await tagTable.insert({tagid: uid, tagname: name});

    ctx.body = {"rlt": "OK"};
}

exports.listTag = async ctx => {


    const rlt = await tagTable.getall();

    ctx.body = rlt;
}