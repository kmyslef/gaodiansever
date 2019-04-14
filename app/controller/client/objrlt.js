"use strict";

const objrltView = require('./../../model/sever/classobjview');
const classTable = require('./../../model/sever/classModel');

exports.listObj = async ctx => {

    const classrlt = await classTable.getall();

    let list = [];
    for (let i = 0; i <classrlt.length; i++){
        const tem = classrlt[i];
        let temrlt = await objrltView.getall(tem.classifyid);
        for (let j = 0; j < temrlt.length; j++){
            let temobj = temrlt[j];
            const tagstr = temobj.tags;
            const tags = JSON.parse(tagstr);
            temobj.tags = tags;
        }

        const temobj = {"classifyid": tem.classifyid, "classifyname": tem.classifyname, "objs":temrlt};
        list.push(temobj);
    }

    ctx.body = list;
}