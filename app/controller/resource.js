"use strict";

const Router = require('koa-router')({prefix: '/resource'});
const severImage = require('./sever/objImage');

// const applefile = require('./AppleFile');


module.exports = Router
    .post('/obj/image', severImage.upimage)
    // .post('/applefile/uploadp12', applefile.uploadP12)
    // .post('/applefile/uploadpro', applefile.uploadPro)
    // .post('/file', applefile.upfile)
    // .post('/image', applefile.upimage)
