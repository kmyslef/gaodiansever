"use strict";
/**
 * Create Date: 2018-08-01,19:32
 * Created by MengLei.
 * Description: .
 */

const Router = require('koa-router')({prefix: '/sever'});
const objclass = require('./sever/objclass');
const objtag = require('./sever/objtag');


module.exports = Router
    .post('/class/add', objclass.addClass)
    .get('/class/list', objclass.listClass)
    .post('/tag/add', objtag.addTag)
    .get('/tag/list', objtag.listTag)