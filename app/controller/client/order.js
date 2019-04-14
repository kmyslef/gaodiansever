"use strict";

const uuidv1 = require('uuid/v1');
const orderTable = require('./../../model/client/orderModel');
const orderobjTable = require('./../../model/client/orderobjModel');
const userView = require('./../../model/client/userview');
const integTable = require('./../../model/client/integralModel');

exports.addOrder = async ctx => {

    const body = ctx.request.body;

    const uid = uuidv1();

    let accountId = "";

    if (body.token) {
        const userrlt = await userView.getuser(body.token);
        if (userrlt){
            accountId = userrlt.accountid;
        }else{
            ctx.body = {res: '0', message: "微信登录过期请退出小程序"};
            return;
        }

    }else {

        ctx.body = {res: '0', message: "微信登录过期请退出小程序"};
        return;
    }

    if (body.objs){
        for (let i = 0;i <body.objs.length; i++){
            const tem = body.objs[i];
            await orderobjTable.insert({orderid: uid, num: tem.num, objid: tem.objid});
        }

        const curtime = new Date();
        await orderTable.insert({orderid: uid, totleprice: body.totleprice, integral: body.integral, actual: body.actual, adress:body.adress, deliverytime:body.deliverytime, ordertime:curtime, accountid:accountId});

    }

    try
    {
        const teminter = await integTable.getOne(accountId);
        let integral = teminter.integral;
        integral = integral - body.integral;

        const addIntegral = parseInt(body.actual);
        integral = integral + addIntegral;

        await integTable.update1(accountId, integral);

        //返回
        ctx.body = {res: '1', addIntegral: addIntegral, integral:integral, iserror:0};
        return;
    }
    catch(err)
    {
        //在这里处理错误
        ctx.body = {res: '1', addIntegral: body.integral, integral:0, iserror:1};
        return;
    }


}