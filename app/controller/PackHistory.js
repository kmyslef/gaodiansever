"use strict";

const iprhistoryview = require('../model/IprHistoryView');



//获取历史列表
exports.getlist = async ctx => {
    const  query = ctx.request.query;
    const  pid = query.pid;
    const pagesize = parseInt(query.pagesize);
    const pageno = parseInt(query.pageno) * pagesize;
    let rlt = await iprhistoryview.getall(pid, pagesize, pageno);
    ctx.body = rlt;
}