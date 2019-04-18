"use strict";

const fs = require('co-fs-extra');
const uuidv1 = require('uuid/v1');
const path = require('path');
const simpleGit = require('simple-git');


//上传图片
exports.upimage = async ctx => {
    const uuid = uuidv1();
    const gitpath = imagesPath;
    await fs.ensureDir(imagesPath);
    //先清除git目录的未提交
    simpleGit(gitpath).raw([
        "reset"
    ]).raw([
        "checkout","."
    ]).raw([
        "clean","-fdx"
    ]);
    //上传图片
    await fs.writeFile(path.join(imagesPath, uuid), ctx.request.body.files.file[0].contents);
    simpleGit(gitpath).raw([
        "add","./*"
    ]).raw([
        "commit","-m",uuid
    ]).raw([
        "remote","rm","origin"
    ]).raw([
        "remote","add","origin","https://dike:kk2573124@git.dev.tencent.com/dike/mysource.git"
    ]).raw([
        "push","origin","master"
    ], (err, result) => {

        // err is null unless this command failed
        // result is the raw output of this command
        if(err===null){
            ctx.body = {fileid: uuid};
        }else{
            ctx.body = {fileid: "error"};
        }
    });
}