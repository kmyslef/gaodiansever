"use strict";

const sequelize = require('./../db/mysql');
const uuidv1 = require('uuid/v1');
const protab = require('./../model/ProjectMysql');
const pro00 = require('./../model/Ipck00Mysql');
const ptype = require('./../model/PtypeMysql');


//获取项目列表
exports.getlist = async ctx => {
    const  query = ctx.request.query;
    const pagesize = parseInt(query.pagesize);
    const pageno = parseInt(query.pageno) * pagesize;
    let rlt = await protab.getall(pagesize, pageno);
    ctx.body = rlt;
}

//获取项目列表
exports.getlistInGroup = async ctx => {
    const  query = ctx.request.query;
    const gid = query.gid;
    let rlt = await protab.getallInGroup(gid);
    ctx.body = rlt;
}

//添加项目信息
exports.add = async ctx => {
    const param = ctx.request.body;
    const uuid = uuidv1();

    if (param.ptype === "00"){

        const pro = param.pro;

        try
        {
            await sequelize.transaction(function (t) {
                return protab.insert({pid: uuid, pname: param.pname, pdes: param.pdes, ptype: param.ptype, gid: param.gid}, { transaction: t}).then(function (protab) {

                    return pro00.insert({pid: uuid, gitpath: pro.gitpath, gitpassword: pro.gitpassword, gitusername: pro.gitusername}, { transaction: t});
                });
            })

            ctx.body = {res: 'ok'};
        }
        catch(err)
        {
            //在这里处理错误
            throw new Error("储存失败");
        }

    }else{

        throw new Error("类型不匹配");
    }
}

//获取项目类型二级代码
exports.getType = async ctx => {

    let rlt = await ptype.getall();
    ctx.body = rlt;
}

//更新项目
exports.updataPro = async ctx => {

    const param = ctx.request.body;

    if (param.ptype === "00"){

        const pro = param.pro;

        try
        {
            await sequelize.transaction(function (t) {
                return protab.update({pid: param.pid, pname: param.pname, pdes: param.pdes, ptype: param.ptype}, t).then(function (protab) {

                    return pro00.update({pid: param.pid, gitpath: param.gitpath, gitpassword: param.gitpassword, gitusername: param.gitusername}, t);
                });
            })

            ctx.body = {res: 'ok'};
        }
        catch(err)
        {
            //在这里处理错误
            throw new Error("储存失败");
        }

    }else{

        throw new Error("类型不匹配");
    }
}

