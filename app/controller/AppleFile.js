"use strict";

const fs = require('co-fs-extra');
const uuidv1 = require('uuid/v1');
const path = require('path');

//上传p12证书
exports.uploadP12 = async ctx => {
    const uuid = uuidv1();
    const folder = p12Path;

    const prefix = path.join(uploadPath, folder);
    await fs.ensureDir(prefix);

    await fs.writeFile(path.join(prefix, uuid + '.p12'), ctx.request.body.files.file12[0].contents);
    ctx.body = {fileid: uuid};
}

//上传描述文件
exports.uploadPro = async ctx => {
    const uuid = uuidv1();
    const folder = proPath;

    const prefix = path.join(uploadPath, folder);
    await fs.ensureDir(prefix);

    await fs.writeFile(path.join(prefix, uuid + '.mobileprovision'), ctx.request.body.files.file[0].contents);
    ctx.body = {fileid: uuid};
}

//上传文件
exports.upfile = async ctx => {

    const folder = ctx.request.query.key;
    const uuid = uuidv1();
    const filename = ctx.request.body.files.file[0].name;
    const name = filename.lastIndexOf(".");
    const namelen = filename.length;
    const postf = filename.substring(name,namelen);

    const prefix = path.join(uploadPath, folder);
    await fs.ensureDir(prefix);

    await fs.writeFile(path.join(prefix, uuid + postf), ctx.request.body.files.file[0].contents);
    ctx.body = {fileid: uuid};
}

//上传图片
exports.upimage = async ctx => {

    const folder = ctx.request.query.key;
    const uuid = uuidv1();
    const filename = ctx.request.body.files.file[0].name;
    const name = filename.lastIndexOf(".");
    const namelen = filename.length;
    const postf = filename.substring(name,namelen);

    const prefix = path.join(uploadPath, folder);
    await fs.ensureDir(prefix);

    await fs.writeFile(path.join(prefix, uuid + postf), ctx.request.body.files.file[0].contents);
    ctx.body = {fileid: uuid};
}