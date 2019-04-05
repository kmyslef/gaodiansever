"use strict";

const Router = require('koa-router')({prefix: '/resource'});
const applefile = require('./AppleFile');


module.exports = Router
    .post('/applefile/uploadp12', applefile.uploadP12)
    .post('/applefile/uploadpro', applefile.uploadPro)
    .post('/file', applefile.upfile)
    .post('/image', applefile.upimage)
