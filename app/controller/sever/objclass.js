"use strict";

const fs = require('co-fs-extra');
const uuidv1 = require('uuid/v1');
const classTable = require('./../../model/sever/classModel');


exports.addClass = async ctx => {

    const body = ctx.request.body;

    const name = body.name;
    const uid = uuidv1();

    await classTable.insert({classifyid: uid, classifyname: name});

    ctx.body = {"rlt": "OK"};
}

exports.listClass = async ctx => {


    const rlt = await classTable.getall();

    ctx.body = rlt;
}