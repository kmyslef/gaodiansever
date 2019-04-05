"use strict";
/**
 * Create Date: 2018-08-01,19:34
 * Created by MengLei.
 * Description: .
 */

const log4js = require('log4js');
const path = require('path');
const fs = require('co-fs-extra');


const http_sucess_path = uploadPath + "/" +logpath + "/" + "httpsucess";
const http_error_path = uploadPath + "/" +logpath + "/" + "httperror";
const pack_path = uploadPath + "/" + logpath + "/" + "pack";
const oth_path = uploadPath + "/" + logpath + "/" + "oth";
fs.ensureDirSync(http_sucess_path);
fs.ensureDirSync(http_error_path);
fs.ensureDirSync(pack_path);
fs.ensureDirSync(oth_path);

log4js.configure({
    appenders: {
        stdout: {
            type: 'stdout'
        },
        httpsucess: {
            type: 'dateFile',
            filename: http_sucess_path + "/",
            pattern: 'http-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        httperror: {
            type: 'dateFile',
            filename: http_error_path + "/",
            pattern: 'httperror-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        pack: {
            type: 'dateFile',
            filename: pack_path + "/",
            pattern: 'pack-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        ohr: {
            type: 'dateFile',
            filename: oth_path + "/",
            pattern: 'ohr-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: {appenders: ['ohr', 'stdout'], level: 'trace'},
        httperr: { appenders: ['stdout', 'httperror'], level: 'error' },
        httpsucess: { appenders: ['stdout', 'httpsucess'], level: 'trace' },
        pack: { appenders: ['stdout', 'pack'], level: 'trace' },
    }
});


exports.getloger = function (name) {//name取categories项
    return log4js.getLogger(name || 'default')
};

