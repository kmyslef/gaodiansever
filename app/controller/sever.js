"use strict";
/**
 * Create Date: 2018-08-01,19:32
 * Created by MengLei.
 * Description: .
 */

const Router = require('koa-router')({prefix: '/sever'});
const objclass = require('./sever/objclass');
const objtag = require('./sever/objtag');
const objc = require('./sever/objcreat');
const order = require('./sever/ordersever');


module.exports = Router
    .post('/class/add', objclass.addClass) //添加分类
    .get('/class/list', objclass.listClass) //分类列表
    .post('/tag/add', objtag.addTag) //添加标签
    .get('/tag/list', objtag.listTag) //标签列表
    .post('/obj/add', objc.add)  //添加商品
    .get('/order/list', order.orderSeverList) //订单列表
    .get('/order/nopaylist', order.orderSeverNoPayList) //没有支付的订单列表
    .get('/order/detail', order.orderSeverDetial) //订单详情
    .post('/order/changepay', order.changePay) //变成已支付
