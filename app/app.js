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

global.uploadPath = '/Volumes/other/aout_pack';  //资源文件总路径

//一下为配置文件的名称与路径名,应该与数据库字段名相同
global.p12Path = 'p12path';               //p12证书存储路径
global.proPath = 'propath';               //描述文件存储路径

global.outRelease = 'OutRelease';           //打出成果物路径
global.code = 'Code';                 //代码存储路径
global.ipaname = 'release.ipa';           //ipa名称
global.ipaplistname = "manifest.plist";    //下载是plist文件名称
global.github = "itms-services://?action=download-manifest&url=https://raw.githubusercontent.com/zhangxinyu2018/OutRelease/master";    //github地址
global.installipa = "itms-services://?action=download-manifest&url=";
global.neiinstall = "https://portal.hyy"; //内网安装路径
global.waiinstall = "https://www.jmwho.cn"; //外网安装路径
global.proconfig = "proconfig";
global.gitconfig = "config_git.sh";
global.logpath = "LOG";
global.packlog = "packlog";    //打包日志文件名
global.serverIP = "http://portal.hyy";
global.waiserver = "http://192.168.141.9:13002";//http://47.93.5.248:13004
global.port = "7001";
global.mailtitle = "自动打版邮件";
global.mac_password = "1";  //mac电脑的开机密码

//项目类型，同ptype表
global.protype_00 = "00";

//苹果证书类型，同appletype表
global.certype_product = "0";  //appstore发布证书，发布描述文件
global.certype_hoc = "1";  //appstore发布证书，hoc描述文件
global.certype_dev = "2";  //dev证书，dev描述文件
global.certype_enterprise = "3";  //企业发布证书，企业描述文件


global.result = require('./utils/result');
global.getloger = require('./utils/logger').getloger;


const app = new Koa();
app.use(bodyReceiver.startup());


app.use(require('koa-static')(path.join(__dirname, './../public'))); //static path
app.use(require('koa-static')(uploadPath + "/" + outRelease)); //输出成果物路径

app.use(async (ctx, next) => {

    try {
        await next();
        ctx.body = {issucess:"1" , data: ctx.body, msg:""};
        getloger('httpsucess').trace(`method: ${ctx.method}, status: ${ctx.status}, code: ${ctx.body.code + `${ctx.body.code != 900 ? ', msg: ' + ctx.body.msg : ''}`}, path: ${ctx.path}, has_auth: ${!!ctx.header.auth}, query: ${JSON.stringify(ctx.query)}, body: ${JSON.stringify(ctx.request.body)}`);

    } catch (ex) {
        let info = {issucess:"0" ,data: {}, msg: `${ex.message}`};
        let resCode = 500;
        getloger('httperr').error(ctx.path);
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
    logger.fatal('server exit.');
    console.log('[FATAL] server exit.');
    process.exit(1);
});
