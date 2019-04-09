"use strict";

const fs = require('co-fs-extra');
const uuidv1 = require('uuid/v1');
const path = require('path');


//上传图片
exports.upimage = async ctx => {

    const uuid = uuidv1();
    await fs.ensureDir(imagesPath);

    await fs.writeFile(path.join(imagesPath, ctx.request.body.files.file[0].name), ctx.request.body.files.file[0].contents);
    ctx.body = {fileid: uuid};
}