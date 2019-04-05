"use strict";
/**
 * Create Date: 2018-07-31,19:22
 * Created by MengLei.
 * Description: .
 */


const Koa = require('koa');
const path = require('path');
const http = require('http');
const config = require('config');
const BodyReceiver = require('bodyreceiver');
const controller = require('./controller');
const resource = require('./controller/resource');
const mytest = require('./controller/myt');
let bodyReceiver = new BodyReceiver({
    maxBodySize: '200mb',
    maxFileSize: '200mb',
    keepFilename: true
});

// global.uploadPath = '/Volumes/other/aout_pack';  //资源文件总路径



const app = new Koa();
app.use(bodyReceiver.startup());


app.use(require('koa-static')(path.join(__dirname, './../public'))); //static path

app.use(async (ctx, next) => {

    try {
        await next();
        ctx.body = {issucess:"1" , data: ctx.body, msg:""};
        // getloger('httpsucess').trace(`method: ${ctx.method}, status: ${ctx.status}, code: ${ctx.body.code + `${ctx.body.code != 900 ? ', msg: ' + ctx.body.msg : ''}`}, path: ${ctx.path}, has_auth: ${!!ctx.header.auth}, query: ${JSON.stringify(ctx.query)}, body: ${JSON.stringify(ctx.request.body)}`);

    } catch (ex) {
        let info = {issucess:"0" ,data: {}, msg: `${ex.message}`};
        let resCode = 500;
        // getloger('httperr').error(ctx.path);
        result(ctx, info, resCode);
    }

});


app.use(controller.routes());
app.use(resource.routes());
app.use(mytest.routes());

http.createServer(app.callback()).listen(config.get('port'), '0.0.0.0', err => {
    if (err) {
        return console.log(`http server init error: ${err.message}`);
    }
    console.log(`http server listening at port: ${config.get('port')}`);
});

process.on('SIGINT', () => {
    require('mongoose').disconnect();
    // logger.fatal('server exit.');
    console.log('[FATAL] server exit.');
    process.exit(1);
});
