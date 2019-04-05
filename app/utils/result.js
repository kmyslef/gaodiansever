"use strict";
/**
 * Create Date: 2018-08-01,19:38
 * Created by MengLei.
 * Description: .
 */

module.exports = function (ctx, content, code) {
    ctx.set('Content-Type', 'application/json;charset=UTF-8');
    ctx.set('Cache-control', 'no-cache');
    if (!code) {
        code = 200;
    }
    ctx.status = code;
    ctx.body = content;
};

