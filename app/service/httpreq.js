"use strict";

const request = require('request-promise-native');
const fs = require('fs');



async function http_formdata(url, filepath) {

    const formData = {
        file: fs.createReadStream(filepath)
    };

    const rlt = await request({
        url:url,
        method: 'POST',
        formData: formData
    });

    return rlt;
}

async function http_get(url) {
    const rlt = await request({
        url: url,
        method: 'GET'
    });
    return rlt;
}





exports.http_get = http_get;
exports.http_formdata = http_formdata;

