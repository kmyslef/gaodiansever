"use strict";

const protab = require('./../model/ProjectMysql');
const iprhistory = require('./../model/IprHistoryMysql');
const ipr00history = require('./../model/Ipr00HistoryMysql');
const pack00 = require('./../controller/PackIpr00');
const sequelize = require('./../db/mysql');
const uuidv1 = require('uuid/v1');
const fs = require('co-fs-extra');
const iprhistoryview = require('../model/IprHistoryView');
const mailObj = require('./../service/mail');
const qr = require('qr-image');
const httpreq = require('./../service/httpreq');


class pack00class{
    constructor (hid, pname, downadr_load, log_pack_build, codepath, outpath){

        this.hid = hid;
        this.pname = pname;
        this.downadr_load = downadr_load;
        this.log_pack_build = log_pack_build;
        this.codepath = codepath;
        this.outpath = outpath;
    }
}


//ios打包
exports.pack = async ctx => {
    const body = ctx.request.body;
    const pid = body.pid;
    const version = body.version;

    //创建通用目录
    let hid = uuidv1();
    const log_pack_build = uploadPath + "/" + logpath + "/" + "pack" + "/" + "bulidlog/" + hid;//打包日志路径
    const codepath = uploadPath + "/" + code + "/" + pid + "/" + hid;
    const outpath = uploadPath + "/" + outRelease + "/" + pid + "/" + hid;  //成果物输出路径

    await fs.ensureDir(log_pack_build);
    await fs.ensureDir(codepath);
    await fs.ensureDir(outpath);

    const prorlt = await protab.getPreject(pid);

    if (prorlt.ptype == protype_00){

        const downadr_load = pid + "/" + hid;
        const curtime = new Date();

        await sequelize.transaction(function (t) {

            return iprhistory.insert({hid: hid, pid: pid, downadr: downadr_load, time: curtime, version: version}, { transaction: t}).then(function (protab) {

                return ipr00history.insert({hid: hid, tag: body.tag, appleid: body.appleid, brance: body.brance}, { transaction: t});
            });
        })

        const pack = new pack00class(hid, prorlt.pname, downadr_load, log_pack_build, codepath, outpath);

        await pack00.iprpack00(body, pack);

    }



    ctx.body = {res: 'ok'};
}

//内网下载
exports.neidown = async ctx => {

    const body = ctx.request.body;
    const hid = body.hid;

    const history = await iprhistoryview.getone(hid);

    const downpath = uploadPath + "/" + outRelease + "/" + history.downadr + "/" + ipaname;

    if (!fs.existsSync(downpath)){

        const log_pack_build = uploadPath + "/" + logpath + "/" + "pack" + "/" + "bulidlog/" + history.downadr + "/" + packlog;
        if (!fs.existsSync(log_pack_build)){
            throw new Error("正在打包中");
        }

        throw new Error("打包失败");
    }


    const neiload = serverIP + ":" + port + "/" + history.downadr + "/" + ipaname;
    const isntallpath = installipa + neiinstall + "/" + history.downadr + "/" + ipaplistname;

    const prorlt = await protab.getPreject(history.pid);

    const mailto = body.mail;
    const mailtostr = mailto.replace(/[\r\n ]/g,"");
    const mailtoarray = mailtostr.split(",");

    const failhtml = `<div style="font-size: x-large;color: blue">项目名称: ${prorlt.pname}</div><br></br>` +
        `<div style="font-size: x-large;color: blue">打版信息: ${history.version}</div><br></br>` +
        `<div style="font-size: large;color: blue;">内网下载地址：${neiload}</div><br></br>`+
        `<div style="font-size: large;color: blue;">内网安装地址：${isntallpath}</div><br></br>` +
        `<div style="font-size: large;color: blue;">内网手机直接安装二维码：见附件</div><br></br>`;


    const neiloadpng = uploadPath + "/" + outRelease + "/" + history.downadr + "/" + "neiqr.png";

    const image_str = qr.imageSync(isntallpath, { type: 'png' });
    await fs.outputFile(neiloadpng, image_str);


    const mailrlt = await mailObj.sendMailWithAnnex(mailtoarray, mailtitle, failhtml, [{filename: "code.png", path: neiloadpng}]);

    ctx.body = {res: 'ok'};
}


async function uploadrelease(mailtoarray, history, prorlt, waifolder) {
    try {
        const downpath = uploadPath + "/" + outRelease + "/" + history.downadr + "/" + ipaname;
        await httpreq.http_formdata(`${waiserver}/api/upload?path=${history.pid}/${history.hid}`, downpath);
        await httpreq.http_formdata(`${waiserver}/api/upload?path=${history.pid}/${history.hid}`, waifolder);

        const neiload = waiserver + "/" + history.downadr + "/" + ipaname;
        const isntallpath = installipa + waiinstall + "/" + history.downadr + "/" + ipaplistname;

        const failhtml = `<div style="font-size: x-large;color: blue">项目名称: ${prorlt.pname}</div><br></br>` +
            `<div style="font-size: x-large;color: blue">打版信息: ${history.version}</div><br></br>` +
            `<div style="font-size: large;color: blue;">外网下载地址：${neiload}</div><br></br>`+
            `<div style="font-size: large;color: blue;">外网安装地址：${isntallpath}</div><br></br>` +
            `<div style="font-size: large;color: blue;">外网手机直接安装二维码：见附件</div><br></br>`;


        const neiloadpng = uploadPath + "/" + outRelease + "/" + history.downadr + "/" + "waiqr.png";

        const image_str = qr.imageSync(isntallpath, { type: 'png' });
        await fs.outputFile(neiloadpng, image_str);


        const mailrlt = await mailObj.sendMailWithAnnex(mailtoarray, mailtitle, failhtml, [{filename: "code.png", path: neiloadpng}]);

    }catch (err) {

        const errmes = err.message;

        const failhtml = '<div style="font-size: x-large;color: red">上传失败</div><br></br>' + '<div style="font-size: large;color: blue;">失败原因:</div>' + `<div>${errmes}</div>`;
        const mailrlt = await mailObj.sendmail(mailtoarray, mailtitle, failhtml);
    }
}

//上传外网
exports.waidown = async ctx => {

    const body = ctx.request.body;
    const hid = body.hid;

    const history = await iprhistoryview.getone(hid);

    const downpath = uploadPath + "/" + outRelease + "/" + history.downadr + "/" + ipaname;

    if (!fs.existsSync(downpath)){

        const log_pack_build = uploadPath + "/" + logpath + "/" + "pack" + "/" + "bulidlog/" + history.downadr + "/" + packlog;
        if (!fs.existsSync(log_pack_build)){
            throw new Error("正在打包中");
        }

        throw new Error("打包失败");
    }

    const manifestPath = uploadPath + "/" + outRelease + "/" + history.downadr + "/" + ipaplistname;

    if (!fs.existsSync(manifestPath)){
        throw new Error("打包失败");
    }

    const manifestFile = fs.readFileSync(manifestPath, "utf-8");
    const tem = "/" + neiinstall + "/g";//waiinstall
    let newmainfestFile = manifestFile.replace(new RegExp(neiinstall,"g"), waiinstall);

    let waifolder = uploadPath + "/" + outRelease + "/" + history.downadr + "/" + "waiwang";
    await fs.ensureDir(waifolder);
    waifolder = waifolder + "/" + ipaplistname;
    await fs.outputFile(waifolder, newmainfestFile);


    const neiload = waiserver + "/" + history.downadr + "/" + ipaname;
    const isntallpath = installipa + waiinstall + "/" + history.downadr + "/" + ipaplistname;

    const prorlt = await protab.getPreject(history.pid);

    const mailto = body.mail;
    const mailtostr = mailto.replace(/[\r\n ]/g,"");
    const mailtoarray = mailtostr.split(",");


    const respon = await httpreq.http_get(`${waiserver}/api/info?path=${history.pid}/${hid}/release.ipa`);
    const responobj = JSON.parse(respon);
    if (responobj.issucess == "1" && responobj.data.res == "has"){


        const failhtml = `<div style="font-size: x-large;color: blue">项目名称: ${prorlt.pname}</div><br></br>` +
            `<div style="font-size: x-large;color: blue">打版信息: ${history.version}</div><br></br>` +
            `<div style="font-size: large;color: blue;">外网下载地址：${neiload}</div><br></br>`+
            `<div style="font-size: large;color: blue;">外网安装地址：${isntallpath}</div><br></br>` +
            `<div style="font-size: large;color: blue;">外网手机直接安装二维码：见附件</div><br></br>`;


        const neiloadpng = uploadPath + "/" + outRelease + "/" + history.downadr + "/" + "waiqr.png";

        const image_str = qr.imageSync(isntallpath, { type: 'png' });
        await fs.outputFile(neiloadpng, image_str);


        const mailrlt = await mailObj.sendMailWithAnnex(mailtoarray, mailtitle, failhtml, [{filename: "code.png", path: neiloadpng}]);
    }
    else{

        uploadrelease(mailtoarray, history, prorlt, waifolder);

    }


    ctx.body = {res: 'ok'};
}