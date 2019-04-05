"use strict";
/**
 * Create Date: 2018-08-01,19:32
 * Created by MengLei.
 * Description: .
 */

const fs = require('co-fs-extra');
const path = require('path');
const Router = require('koa-router')({prefix: '/abb'});
//const HelloMongo = require('./../model/HelloMongo');

module.exports = Router
    .get('/', ctx => ctx.body = {
        ret: 'ok'
    })
    //上传文件
    .post('/upload', async ctx => {  //post方法，内含异步操作
        let cur = new Date();
        let body = ctx.request.body;
        let folder = cur.toLocaleDateString();
        //__dirname表示当前js文件所在路径，prefix表示文件要存放的文件夹，ensure要确定文件夹存在，如果不存在则创建
        let prefix = path.join(uploadPath, folder);
        await fs.ensureDir(prefix);
        //将上传的文件写入目的文件夹中
        //ctx.request.body为提交的form-data内容，ctx.request.body.files表示上传的文件，ctx.request.body.fields表示提交的参数
        //如果是application/json方式提交的，则直接通过ctx.request.body可以取到内容
        await fs.writeFile(path.join(prefix, ctx.request.body.files.file[0].name), ctx.request.body.files.file[0].contents);
        ctx.body = 'ok';
    })