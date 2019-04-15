"use strict";
const httpreq = require('./../../service/httpreq');
const wxCrypt = require('./../../utils/WXBizDataCrypt');
const userTable = require('./../../model/client/userModel');
const uuidv1 = require('uuid/v1');
const tokenTable = require('./../../model/client/tokenModel');
const integralTable = require('./../../model/client/integralModel');

//登录
exports.login = async ctx => {
    const body = ctx.request.body;

    const weixinUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${body.code}&grant_type=authorization_code`;
    const respon = await httpreq.http_get(weixinUrl);
    if (!respon){
        throw new Error("微信登录失败");
    }

    const responobj = JSON.parse(respon);
    const openid = responobj.openid;

    const userRlt = await userTable.getuser(openid);
    let accountid = "";
    if (userRlt){
        accountid = userRlt.accountid
        if (userRlt.nick != body.nick || userRlt.avatarUrl != body.avatarUrl){
            await userTable.update(userRlt.accountid, body.nick, body.avatarUrl);
        }
    }else{

        accountid = uuidv1();
        await userTable.insert({
            accountid: accountid,
            openid: openid,
            unitid: null,
            nick: body.nick,
            phone: null,
            gender: body.gender,
            avatarUrl: body.avatarUrl
        });
    }

    const tokenRlt = await tokenTable.getToken(accountid);
    let token = null;
    if (!tokenRlt){
        token = uuidv1();
        await tokenTable.insert({
            accountid: accountid,
            token: token
        });
    }else{
        token = tokenRlt.token;
    }

    const integralRlt = await integralTable.getOne(accountid);
    let integral = 0;
    if (!integralRlt){
        await integralTable.insert({
            accountid: accountid,
            integral: integral
        });
    }else{
        integral = integralRlt.integral;
    }



    // throw new Error("微信登录失败");
    ctx.body = {"token": token, "integral":integral};
}