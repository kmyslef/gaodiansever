"use strict";

const fs = require('co-fs-extra');
const orderview = require('./../../model/sever/orderview');
const orderobjview = require('./../../model/sever/orderobjview');
const orderTable = require('./../../model/client/orderModel');

exports.orderSeverList = async ctx => {

    const  query = ctx.request.query;
    const pagesize = parseInt(query.pagesize);
    const pageno = parseInt(query.pageno) * pagesize;

    const rlt = await orderview.getall(pagesize, pageno);

    ctx.body = rlt;
}

exports.orderSeverNoPayList = async ctx => {

    const  query = ctx.request.query;
    const pagesize = parseInt(query.pagesize);
    const pageno = parseInt(query.pageno) * pagesize;

    const rlt = await orderview.getallNoPay(pagesize, pageno);

    ctx.body = rlt;
}

exports.orderSeverDetial = async ctx => {

    const  query = ctx.request.query;
    const orderid = query.orderid;

    const rlt = await orderobjview.getall(orderid);

    ctx.body = rlt;
}

exports.changePay = async ctx => {

    const body = ctx.request.body;
    const orderid = body.orderid;

    const rlt = await orderTable.updatepay(orderid, "1");

    ctx.body = {"rlt": "OK"};
}

