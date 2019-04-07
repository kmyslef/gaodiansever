"use strict";
const httpreq = require('./../../service/httpreq');

//登录
exports.login = async ctx => {
    const  query = ctx.request.query;
    const code = query.code;

    const weixinUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
    const respon = await httpreq.http_get(weixinUrl);
    const responobj = JSON.parse(respon);

    ctx.body = {res: 'ok'};
}