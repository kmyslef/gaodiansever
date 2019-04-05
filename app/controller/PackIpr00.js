"use strict";
const codetab = require('./../model/Ipck00Mysql');
const appleres = require('./../model/AppleInfoMysql');

const fs = require('co-fs-extra');
const path = require('path');
const uuidv1 = require('uuid/v1');
const { exec, spawn } = require('child-process-async');
const plist = require('plist');
const mailObj = require('./../service/mail');
const qr = require('qr-image');
const config = require('config');


class ipr_pack_config{
    constructor(bundleid, tagpath, releasepath, p12path, p12password, propath, mail, prouid) {
        this.bundleid = bundleid;
        this.tagpath = tagpath;      //状态代码等信息的路径，打包完成后删除
        this.releasepath = releasepath;  //打包成功后内网路径，为发邮件
        this.p12path = p12path;
        this.p12password = p12password;
        this.propath = propath;   //描述文件路径
        this.mail = mail;         //给发件人的地址
        this.prouid = prouid;         //描述文件uid
        this.macpassword = mac_password;
    }
}

function ios_readDirWithNameSync(path, comparname){

    let rltpath = "";

    const pa = fs.readdirSync(path);
    pa.some(function(ele,index){

        const proarr = ele.match(comparname);
        if (proarr && !ele.match("Pods.xcodeproj")) {
            rltpath = path;
            return true;
        }else {
            const info = fs.statSync(path+"/"+ele)
            if(info.isDirectory()){

                rltpath = ios_readDirWithNameSync(path+"/"+ele, comparname);
                if (rltpath.length > 0)
                {
                    return true;
                }
            }
        }


    })

    return rltpath;

}

//ipr00异步打包过程
async function ipr00_pack(body, pack, codeinfo, appleresRlt){

    try {
        const tp12 = uploadPath + "/" + p12Path + "/" + appleresRlt.p12path + ".p12";
        const tppro = uploadPath + "/" + proPath + "/" + appleresRlt.propath + ".mobileprovision";

        const certype = appleresRlt.type;

        //创建git配置文件
        let gitpath = codeinfo.gitpath;

        if (gitpath.slice(0, 4) == "http"){
            const username = codeinfo.gitusername;
            const pawssword = codeinfo.gitpassword;
            const arr = gitpath.split('://');
            const head = arr[0];
            const end = arr[1];

            gitpath = head + "://" + username + ":" + pawssword + "@" + end;
        }

        const gitstr = "cd " + pack.codepath + "\n" + "git clone --branch " + body.tag + " " + gitpath;


        const gitprotem = gitpath.split('/').pop();
        const gitpro = gitprotem.split('.git').shift();
        const codegitrltpath = pack.codepath + "/" + gitpro;


        // 拉取git代码
        await exec(gitstr, {});


        //获取描述文件以及证书信息
        const cerstr = await exec(`keytool -list -keystore  ${tp12} -storepass 123456 -v`, {});
        const cerarr = cerstr.stdout.match("CN=(.*?),.*?");
        const team_name = cerarr[1];
        const cerpath = pack.codepath + "/cer.plist";
        await exec("security cms -D -i " + tppro + " > " + cerpath, {});

        const cerxml = fs.readFileSync(cerpath, "utf-8");
        const xmlrlt = plist.parse(cerxml);


        const teamid = xmlrlt.Entitlements["com.apple.developer.team-identifier"];
        const prouid = xmlrlt.UUID;
        const profile_name = xmlrlt.Name;
        const temkey = xmlrlt.Entitlements["application-identifier"];
        const bundleid = temkey.substring(teamid.length + 1, temkey.length);

        const coderltpath =  ios_readDirWithNameSync(codegitrltpath, ".xcodeproj");
        const files = fs.readdirSync(coderltpath);
        let workspacename = "";
        let projectname = "";


        // let hasproject = false;
        files.forEach(function(file,index){
            let workarr = file.match(".xcworkspace");
            let proarr = file.match(".xcodeproj");
            if (workarr){
                workspacename = file;
            }

            if (proarr){
                // hasproject = true;
                projectname = file;
            }

        });

        const schecme_cmd = await exec("cd " + coderltpath + "\n xcodebuild -list", {});
        const tt = schecme_cmd.stdout;
        const tarr = schecme_cmd.stdout.split("\n");
        let schecme = "";

        for(let i = 0; i < tarr.length; i++){
            const str = tarr[i];
            const val = str.replace(/\s+/g,"");
            if (val == "Targets:"){
                schecme = tarr[i + 1].replace(/\s+/g,"");
                break;
            }
        }

        //创建配置文件
        const temlane = coderltpath +  "/fastlane";


        //调试到此行
        const pro_config = new ipr_pack_config(bundleid, pack.codepath, pack.downadr_load, tp12, appleresRlt.p12pasw, tppro, body.mail, prouid);
        const proconfigpath = temlane + "/" + proconfig;
        await fs.outputJSON(proconfigpath, pro_config);

        //拷贝action文件
        const actionPath = temlane + "/actions";
        await fs.ensureDir(actionPath);
        const rbpath = path.join(__dirname, './../', 'res');
        await fs.copy(rbpath + '/cer_import.rb', actionPath + '/cer_import.rb');


        //创建lan文件
        let lan_str = "default_platform(:ios)" + "\n";
        lan_str = lan_str + "platform :ios do \ndesc \"Description of what the lane does\" \n";
        lan_str = lan_str + "lane :build_appstore do |op|" + "\n";
        lan_str = lan_str + "automatic_code_signing(" + "\n";
        lan_str = lan_str + "path:\"" + projectname + "\"," + "\n";
        lan_str = lan_str + "use_automatic_signing:false," + "\n";
        lan_str = lan_str + "team_id:\"" + teamid +  "\"," + "\n";
        lan_str = lan_str + "targets:\"" + schecme +  "\"," + "\n";

        let code_sign_identity = "iPhone Distribution";
        if (certype == certype_dev){
            //开发者证书
            code_sign_identity = "iPhone Develop";
        }
        lan_str = lan_str + "code_sign_identity:\"" + code_sign_identity + "\"," + "\n";
        lan_str = lan_str + "profile_name:\"" + profile_name + "\"\n";
        lan_str = lan_str + ")" + "\n";

        // lan_str = lan_str + "currentTime = Time.new.strftime(\"%Y-%m-%d-%H-%M\")" + "\n";
        lan_str = lan_str + "outputDirectory = \"" + pack.outpath +  "\"" + "\n";
        lan_str = lan_str + "cer_import() \n";

        lan_str = lan_str + "gym( \n";
        let export_method = "app-store";
        if (certype == certype_hoc){
            export_method = "ad-hoc";
        }else if (certype == certype_dev){
            export_method = "development";
        }else if (certype == certype_enterprise){
            export_method = "enterprise";
        }
        lan_str = lan_str + "export_method:\"" + export_method +  "\"," + "\n";
        lan_str = lan_str + "scheme:\"" + schecme +  "\"," + "\n";
        if (workspacename.length > 0){
            lan_str = lan_str + "workspace:\"" + workspacename +  "\"," + "\n";
        }
        lan_str = lan_str + "output_directory: outputDirectory," + "\n";
        lan_str = lan_str + "output_name:\"" + ipaname + "\"," + "\n";
        lan_str = lan_str + "clean:true," + "\n";
        lan_str = lan_str + "silent:true," + "\n";
        lan_str = lan_str + "configuration:\"Release\"," + "\n";
        lan_str = lan_str + "buildlog_path:outputDirectory," + "\n";
        lan_str = lan_str + "codesigning_identity:\"" + team_name +  "\"," + "\n";
        lan_str = lan_str + "export_xcargs: \"-allowProvisioningUpdates\"," + "\n";
        lan_str = lan_str + "export_options:{" + "\n";
        lan_str = lan_str + "provisioningProfiles: {" + "\n";
        lan_str = lan_str + "\"" + bundleid + "\" => " + "\"" + profile_name + "\"," + "\n";
        lan_str = lan_str + "}," + "\n";

        lan_str = lan_str + "manifest: {" + "\n";
        lan_str = lan_str + `appURL: "${neiinstall}/${body.pid}/${pack.hid}/${ipaname}",` + "\n";
        lan_str = lan_str + `displayImageURL: "${neiinstall}/image.57x57.png",` + "\n";
        lan_str = lan_str + `fullSizeImageURL: "${neiinstall}/image.512x512.png",` + "\n";

        lan_str = lan_str + "}," + "\n";


        lan_str = lan_str + "}" + "\n";
        lan_str = lan_str + ")" + "\n";
        lan_str = lan_str + "end" + "\n";
        lan_str = lan_str + "end";

        //生成lan文件
        await fs.ensureDir(temlane);
        const lanpatn = temlane + "/Fastfile";
        await fs.outputFile(lanpatn, lan_str);

        const lanpack = "#! /bin/bash \n cd " + coderltpath + "\n" + "fastlane build_appstore";
        const shpath = pack.codepath + "/runbuild.sh";
        await fs.outputFile(shpath, lanpack);

        await exec("chmod +x " + shpath, {});

        const rlt = await spawn('sh', [shpath], {});
        //写日志文件
        const bulidlog_name = pack.log_pack_build + "/" + packlog;
        await fs.outputFile(bulidlog_name, rlt.stdout);

        if (rlt.exitCode == 0){
            //成功运行完脚本
            const errmes = "pack_sucess <br></br> path:" + pack.downadr_load;
            getloger('pack').trace(errmes);

            const downadr_load_path = serverIP + ":" + port + "/" + pack.downadr_load + "/" + ipaname;
            const html = `<div style="font-size: xx-large;color: green;">打包成功</div><br></br><div style="font-size: larger;color: red;">注意:此邮件不代表一定打版成功，如果下载不到可以查阅附件日志，如果打版失败请在历史记录中重新打版</div><br></br><div style="font-size: larger;color: blue;">内网下载路径:</div><div style="font-size: larger;color: lightskyblue;">${downadr_load_path}</div>`
            const mailrlt = await mailObj.sendMailWithAnnex(body.mail, mailtitle, html, [{filename: pack.hid, path: bulidlog_name}]);

        }else{
            //运行脚本出现错误

            const errmesage = `具体错误信息见附件日志: <br></br> 附件日志名称：${pack.hid}`;

            const errmes = "pack_error <br></br> path:" + pack.downadr_load + " <br></br> errmes:" + errmesage;
            getloger('pack').error(errmes);

            const failhtml = '<div style="font-size: x-large;color: red">打版失败</div><br></br>' + `<div style="font-size: large;color: red;">名称:${pack.pname}----id[${pack.hid}]</div>`+ '<div style="font-size: large;color: blue;">失败原因:</div>' + `<div>${errmes}</div>`;
            const mailrlt = await mailObj.sendMailWithAnnex(body.mail, mailtitle, failhtml, [{filename: pack.hid, path: bulidlog_name}]);
        }

        //清除代码
        fs.emptyDirSync(pack.codepath);

    } catch (err) {


        try {
            const errmes = "pack_error <br></br> path:" + pack.downadr_load + " <br></br> errmes:" + err.message;
            getloger('pack').error(errmes);

            const failhtml = '<div style="font-size: x-large;color: red">打版失败</div><br></br>' + `<div style="font-size: large;color: red;">名称:${pack.pname}----id[${pack.hid}]</div>`+ '<div style="font-size: large;color: blue;">失败原因:</div>' + `<div>${errmes}</div>`;
            const mailrlt = await mailObj.sendmail(body.mail, mailtitle, failhtml);
        }
        catch (err1) {
            console.log(err1.message);
        }

        //清除代码
        fs.emptyDirSync(pack.codepath);
    }

}


async function pack00(body, pack) {

    const codeinfo = await codetab.getinfo(body.pid);
    const appleresRlt = await appleres.getinfo(body.appleid);

    const p12path = uploadPath + "/" + p12Path + "/" + appleresRlt.p12path;
    const propath = uploadPath + "/" + proPath + "/" + appleresRlt.propath;

    await fs.ensureDir(p12path);
    await fs.ensureDir(propath);

    //获取证书描述文件路径，校验证书描述文件是否存在
    const tp12 = p12path + ".p12";
    let isexist = fs.existsSync(tp12);
    if (!isexist){
        throw new Error("P12证书已不存在，请重新上传");
    }

    const tppro = propath + ".mobileprovision";
    isexist = fs.existsSync(tppro);
    if (!isexist){
        throw new Error("描述文件已不存在，请重新上传");
    }



    ipr00_pack(body, pack, codeinfo, appleresRlt);
}


exports.iprpack00 = pack00;