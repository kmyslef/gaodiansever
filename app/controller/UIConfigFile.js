"use strict";

const pro00cnf = require('./UIPro00Config');
const protab = require('./../model/ProjectMysql');

//获取项目配置文件
exports.getProCnf = async ctx => {

    const query = ctx.request.query;

    if (query.type == protype_00){
        let rlt = pro00cnf.getProConfig();
        ctx.body = rlt;
    }

}

//获取项目详情配置文件
exports.getProDetailCnf = async ctx => {

    const query = ctx.request.query;

    const prorlt = await protab.getPreject(query.pid);

    if (prorlt.ptype == protype_00){
        const rlt = await pro00cnf.getProDetailConfig(prorlt);
        ctx.body = rlt;
    }


}


//获取项目配置文件
exports.getPackCnf = async ctx => {

    const query = ctx.request.query;

    const prorlt = await protab.getPreject(query.pid);

    if (prorlt.ptype == protype_00){
        const rlt = await pro00cnf.getPackConfig(query.pid, prorlt.pname);
        ctx.body = rlt;
    }


}



