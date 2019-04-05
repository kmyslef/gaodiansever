"use strict";

const appleview = require('../model/AppleInfoView');
const appletype = require('./../model/AppleTypeMysql');
const pro00 = require('./../model/Ipck00Mysql');
const ptype = require('./../model/PtypeMysql');





function getProCnf() {
    let proval = `[
        {
            "groupName":"git相关信息",
            "groupInfo":[
                {
                    "type":"input",
                    "name":"gitpath",
                    "nameCN":"git地址(http形式)",
                    "required":"yes",
                    "subInfo":{

                    }
                },
                {
                    "type":"input",
                    "name":"gitusername",
                    "nameCN":"git用户名",
                    "required":"yes",
                    "subInfo":{

                    }
                },
                {
                    "type":"input",
                    "name":"gitpassword",
                    "nameCN":"git用户密码",
                    "required":"yes",
                    "subInfo":{

                    }
                }
            ]
        }
    ]`

    proval = proval.replace(/[\r\n ]/g,"");

    return proval;
}

async function getProDetailCnf(protab) {

    const ipr00rlt = await pro00.getinfo(protab.pid);
    const ptyperlt = await ptype.getallInCode();
    const typestr = JSON.stringify(ptyperlt);

    let proval = `[
        {
            "groupName":"项目基本信息",
            "groupInfo":[
                {
                    "type":"label",
                    "name":"pid",
                    "nameCN":"项目id",
                    "required":"yes",
                    "subInfo":{
                        "showtext":"${protab.pid}",
                        "hide":"1"
                    }
                },
                {
                    "type":"input",
                    "name":"gitpath",
                    "nameCN":"项目名称",
                    "required":"yes",
                    "subInfo":{
                        "showText":"${protab.pname}"
                    }
                },
                {
                    "type":"select",
                    "name":"ptype",
                    "nameCN":"项目类型",
                    "required":"yes",
                    "subInfo":{
                        "selectArr":${typestr},
                        "selectedCode":"${protab.ptype}"
                    }
                }
            ]
        },
        {
            "groupName":"git相关信息",
            "groupInfo":[
                {
                    "type":"input",
                    "name":"gitpath",
                    "nameCN":"git地址(http形式)",
                    "required":"yes",
                    "subInfo":{
                        "showText":"${ipr00rlt.gitpath}"
                    }
                },
                {
                    "type":"input",
                    "name":"gitusername",
                    "nameCN":"git用户名",
                    "required":"yes",
                    "subInfo":{
                        "showText":"${ipr00rlt.gitusername}"
                    }
                },
                {
                    "type":"input",
                    "name":"gitpassword",
                    "nameCN":"git用户密码",
                    "required":"yes",
                    "subInfo":{
                        "showText":"${ipr00rlt.gitpassword}"
                    }
                }
            ]
        }
    ]`

    proval = proval.replace(/[\r\n ]/g,"");

    return proval;
}


async function getPackCnf(pid, pidname) {

    const appleviewrlt = await appleview.getallInCode(pid);
    const arrstr = JSON.stringify(appleviewrlt);
    const type = await appletype.getallInCode();
    const typestr = JSON.stringify(type);

    let packval = `[
    {
        "groupName":"基本信息",
        "groupInfo":[
            {
                "type":"label",
                "name":"pname",
                "nameCN":"项目名称",
                "required":"yes",
                "subInfo":{
                    "showtext":"${pidname}",
                    "hide":"0"
                }
            },
            {
                "type":"input",
                "name":"version",
                "nameCN":"请填写版本信息",
                "required":"yes",
                "subInfo":{
                }
            },
            {
                "type":"input",
                "name":"mail",
                "nameCN":"邮件(打版完成通知)",
                "required":"yes",
                "subInfo":{
                    "checkRule":"^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$"
                }
            }
        ]
    },
    {
        "groupName":"git相关信息",
        "groupInfo":[
            {
                "type":"input",
                "name":"brance",
                "nameCN":"请输入brance",
                "required":"yes",
                "subInfo":{
                }
            },
            {
                "type":"input",
                "name":"tag",
                "nameCN":"请输入tag",
                "required":"yes",
                "subInfo":{
                }
            }
        ]
    },
    {
        "groupName":"证书相关信息",
        "groupInfo":[
            {
                "type":"subpage",
                "name":"",
                "nameCN":"添加苹果证书",
                "required":"yes",
                "subInfo":{
                    "posturl":"/api/project/apple/add",
                    "groups":[
                        
                        {
                            "groupName":"git相关信息",
                            "groupInfo":[
                                {
                                    "type":"label",
                                    "name":"pid",
                                    "nameCN":"项目id",
                                    "required":"yes",
                                    "subInfo":{
                                        "showtext":"${pid}",
                                        "hide":"1"
                                    }
                                },
                                {
                                    "type":"label",
                                    "name":"pname",
                                    "nameCN":"项目名称",
                                    "required":"yes",
                                    "subInfo":{
                                        "showtext":"${pidname}",
                                        "hide":"0"
                                    }
                                },
                                {
                                    "type":"input",
                                    "name":"des",
                                    "nameCN":"证书描述信息",
                                    "required":"yes",
                                    "subInfo":{
                                    }
                                },
                                {
                                    "type":"select",
                                    "name":"type",
                                    "nameCN":"请选择证书类型",
                                    "required":"yes",
                                    "subInfo":{
                                        "selectArr":${typestr}
                                    }
                                },
                                {
                                    "type":"file",
                                    "name":"propath",
                                    "nameCN":"上传描述文件",
                                    "required":"yes",
                                    "subInfo":{
                                        "checkFormat":"mobileprovision"
                                    }
                                },
                                {
                                    "type":"file",
                                    "name":"p12path",
                                    "nameCN":"上传p12证书",
                                    "required":"yes",
                                    "subInfo":{
                                        "checkFormat":"p12"
                                    }
                                },
                                {
                                    "type":"input",
                                    "name":"p12pasw",
                                    "nameCN":"填写p12密码",
                                    "required":"yes",
                                    "subInfo":{
                                    }
                                }
                            ]
                        }
                        
                    ]
                }
            },
            {
                "type":"select",
                "name":"appleid",
                "nameCN":"请选择打版证书",
                "required":"yes",
                "subInfo":{
                    "selectArr":${arrstr}
                }
            }
        ]
    }
]`;

    packval = packval.replace(/[\r\n ]/g,"");

    const ttl = JSON.parse(packval);//测试是否json格式

    return packval;

}





exports.getProConfig = getProCnf;

exports.getProDetailConfig = getProDetailCnf;

exports.getPackConfig = getPackCnf;