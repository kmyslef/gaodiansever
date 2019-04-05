"use strict";
const nodemailer  = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
const config = require('config');

const mailconfig = config.get("mail");

const sendfrom = mailconfig.get('sendfrom');

const transport = nodemailer.createTransport(smtpTransport({
    host: mailconfig.host, // 主机
    secure: mailconfig.secure, // 使用 SSL
    port: mailconfig.port, // SMTP 端口
    auth: {
        user: mailconfig.user, // 账号
        pass: mailconfig.pass // 密码
    },
    tls:{rejectUnauthorized: false}
}));

class mailObj{
    constructor(from, to, subject, html, annexs){
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.html = html;
        this.attachments = annexs;
    }
}

class mailAnnex {
    constructor(filename, path){
        this.filename = filename;
        this.path = path;
    }
}

// 发邮件
async function sendMail(sendto, title, html) {
    return new Promise((resolve, reject) => {
        const sendobj = new mailObj(sendfrom, sendto, title, html);
        transport.sendMail(sendobj, (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
            transport.close(); // 如果没用，关闭连接池
        });

    });
}

//annexs 是一个数组 [      {        filename : 'package.json',        path: './package.json'      },      {        filename : 'content',        content : '发送内容'      }    ]
async function sendMailWithAnnex(sendto, title, html, annexs) {
    return new Promise((resolve, reject) => {
        const sendobj = new mailObj(sendfrom, sendto, title, html, annexs);
        transport.sendMail(sendobj, (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
            transport.close(); // 如果没用，关闭连接池
        });

    });
}


exports.sendmail = sendMail;
//邮件带附件
exports.sendMailWithAnnex = sendMailWithAnnex;