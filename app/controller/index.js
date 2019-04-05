"use strict";

const Router = require('koa-router')({prefix: '/api'});
const group = require('./GroupRoute');
const project = require('./PrejectRoute');
const apple = require('./AppleInfo');
const pack = require('./Pack');
const packhistory = require('./PackHistory');
const config = require('./UIConfigFile');

module.exports = Router
    //获取组列表
    .get('/group/list', group.getlist)
    //添加组信息
    .post('/group/add', group.add)
    //获取项目列表
    .get('/project/list', project.getlistInGroup)
    //获取项目类型二级代码
    .get('/project/type', project.getType)
    //添加项目信息
    .post('/project/add', project.add)
    //添加苹果证书
    .post('/project/apple/add', apple.add)
    //获取苹果证书列表
    .get('/project/apple/list', apple.getlist)
    //获取证书类型二级代码
    .get('/project/apple/type', apple.gettype)
    //打包
    .post('/project/pack', pack.pack)
    //打包历史
    .get('/project/packhistory', packhistory.getlist)
    //获取项目配置文件
    .get('/config/project', config.getProCnf)
    //获取打包配置文件
    .get('/config/pack', config.getPackCnf)
    //获取项目详情配置文件
    .get('/config/prodetail', config.getProDetailCnf)
    //更新项目详情
    .post('/project/update', project.updataPro)
    //内网下载
    .post('/project/neiload', pack.neidown)
    //上传外网
    .post('/project/waiload', pack.waidown)