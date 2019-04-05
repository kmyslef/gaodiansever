/**
 *  create by shangzj
 *  Version 1.1.7
 */

// 单行alert
function alertMsg(msg, time) {
	/*
	 * adiv : 新生成div
	 * aspan : 新生成div 子元素span
	 * msg : 显示文字参数;
	 * time : 时间参数，时间内消失，默认 1.5s;
	 */
	if(!!document.getElementsByClassName("alertm").length) {
		document.body.removeChild(document.getElementsByClassName("alertm")[0]);
	}
	var adiv = document.createElement("div");
	adiv.setAttribute("class", "alertm");
	adiv.style.position = "fixed";
	adiv.style.bottom = "50px";
	adiv.style.left = "0";
	adiv.style.right = "0";
	adiv.style.textAlign = "center";
	adiv.style.zIndex = "99999";

	var aspan = document.createElement("span");
	adiv.appendChild(aspan);
	aspan.style.display = "inline-block";
	aspan.style.padding = "5px 45px";
	aspan.style.color = "#fff";
	aspan.style.fontSize = "14px";
	aspan.style.background = "rgba(33, 33, 33, .7)";
	aspan.style.borderRadius = "5px";

	aspan.innerText = msg;

	document.body.appendChild(adiv);

	if(time == null || time == "") {
		time = 1500;
	}
	setTimeout("document.body.removeChild(document.getElementsByClassName('alertm')[0])", time);
}

// loading 进度条
function loadingToast(msg, type, time) {
	/*
	 * msg : 显示文字参数;
	 * type : 类型，sucess：成功；fail：失败；默认加载中
	 * time : 时间参数，时间内消失，默认 0.1s;
	 */
	var tid = document.createElement("div");

	tid.setAttribute("class", "loadingToast");

	var toastMast = document.createElement("div");
	toastMast.setAttribute("class", "weui-mask_transparent");

	tid.appendChild(toastMast);

	var toastDiv = document.createElement("div");
	toastDiv.setAttribute("class", "weui-toast weui-toast--visible");
	tid.appendChild(toastDiv);

	var toastI = document.createElement("i");
	if(type == "sucess") {
		toastI.setAttribute("class", "weui-icon-success-no-circle weui-icon_toast");
	} else if(type == "fail") {
		toastI.setAttribute("class", "weui-icon-cancel weui-icon_toast");
	} else {
		toastI.setAttribute("class", "weui-loading weui-icon_toast");
	}
	toastDiv.appendChild(toastI);

	var toastP = document.createElement("p");
	toastP.setAttribute("class", "weui-toast__content");
	toastDiv.appendChild(toastP);

	if((msg == null || msg == "") && type != "sucess" && type != "fail") {
		msg = "数据加载中";
	}
	toastP.innerText = msg;

	document.body.appendChild(tid);

	if(type == "sucess") {
		getCloseLoad(time);
	} else if(type == "fail") {
		getCloseLoad(time);
	}
}

function loadingToast2(time) {
	var tid = document.createElement("div");
	tid.setAttribute("class", "mint-indicator mint-indicator-enter-active mint-indicator-enter-to loadingToast");

	var toastWrapper = document.createElement("div");
	toastWrapper.setAttribute("class", "mint-indicator-wrapper");
	tid.appendChild(toastWrapper);

	var toastSpin = document.createElement("span");
	toastSpin.setAttribute("class", "mint-indicator-spin");
	toastWrapper.appendChild(toastSpin);

	var toastBounce = document.createElement("div");
	toastBounce.setAttribute("class", "mint-spinner-triple-bounce");
	toastSpin.appendChild(toastBounce);

	var toastBounce1 = document.createElement("div");
	toastBounce1.setAttribute("class", "mint-spinner-triple-bounce-bounce1");
	toastBounce.appendChild(toastBounce1);

	var toastBounce2 = document.createElement("div");
	toastBounce2.setAttribute("class", "mint-spinner-triple-bounce-bounce2");
	toastBounce.appendChild(toastBounce2);

	var toastBounce3 = document.createElement("div");
	toastBounce3.setAttribute("class", "mint-spinner-triple-bounce-bounce3");
	toastBounce.appendChild(toastBounce3);

	var toastStext = document.createElement("span");
	toastStext.setAttribute("class", "mint-indicator-text hided");
	toastWrapper.appendChild(toastStext);

	var toastMask = document.createElement("div");
	toastMask.setAttribute("class", "mint-indicator-mask");
	tid.appendChild(toastMask);
	document.body.appendChild(tid);
	if(time == null || time == "") {
		time = 1000;
	}
}

// 关闭loading
function getCloseLoad(time) {
	if(time == null || time == "") {
		time = 100;
	}
	//	if(document.getElementById('loadingToast') != null && document.getElementById('loadingToast') != "") {
	//		setTimeout("document.body.removeChild(document.getElementById('loadingToast'))", time);
	//	}
	if(document.getElementsByClassName('loadingToast') != null && document.getElementsByClassName('loadingToast') != "") {
		setTimeout("document.body.removeChild(document.getElementsByClassName('loadingToast')[0])", time);
	}
}

// 模态框
function dialogMsg(msg, btnMA, btnMB, time, stype, callback1, callback2) {
	/*
	 * 模态框
	 * msg : 显示文字参数;
	 * btnMA : 按钮文字1，默认为空是’确定‘;
	 * btnMB : 按钮文字2，默认为空是’返回‘;
	 * time : 时间参数，时间内消失，默认 0.1s;
	 * stype : 按钮数量，1：一个，2：两个，默认一个
	 * callback1 : 确定回调函数;
	 * callback2 : 返回回调函数
	 */
	if(!!document.getElementsByClassName('dialogs').length) {
		document.body.removeChild(document.getElementsByClassName('dialogs')[0]);
	}

	var dlg = document.createElement("div");
	dlg.setAttribute("class", "dialogs");

	var toastDlg = document.createElement("div");
	toastDlg.setAttribute("class", "iosDialog2");
	toastDlg.setAttribute("class", "js_dialog");
	dlg.appendChild(toastDlg);

	var toastMask = document.createElement("div");
	toastMask.setAttribute("class", "weui-mask weui-mask--visible");
	toastDlg.appendChild(toastMask);

	var toastDiv = document.createElement("div");
	toastDiv.setAttribute("class", "weui-dialog weui-dialog--visible");
	toastDlg.appendChild(toastDiv);

	var toastP = document.createElement("div");
	toastP.setAttribute("class", "weui-dialog__bd");
	toastDiv.appendChild(toastP);

	var toastBtn = document.createElement("div");
	toastBtn.setAttribute("class", "weui-dialog__ft");
	toastDiv.appendChild(toastBtn);

	var toastBtnA = document.createElement("a");
	toastBtnA.setAttribute("class", "weui-dialog__btn weui-dialog__btn_primary dialogBtn");
	//	toastBtnA.setAttribute("id", "dialogBtn");
	toastBtn.appendChild(toastBtnA);

	toastP.innerText = msg;

	if(btnMA == null || btnMA == "") {
		btnMA = "确定";
	}
	toastBtnA.innerText = btnMA;

	if(stype == "2") {
		var toastBtnB = document.createElement("a");
		toastBtnB.setAttribute("class", "weui-dialog__btn weui-dialog__btn_primary dialogBtnFh");
		//		toastBtnB.setAttribute("id", "dialogBtnFh");
		toastBtn.appendChild(toastBtnB);
		if(btnMB == null || btnMB == "") {
			btnMB = "返回";
		}
		toastBtnB.innerText = btnMB;
	}

	document.body.appendChild(dlg);

	var oBtn = document.getElementsByClassName('dialogBtn')[0];
	if(!callback1) {
		callback1 = function() {
			getCloseDialog();
		}
	}
	oBtn.onclick = callback1;

	if(stype == "2") {
		var oBtnFh = document.getElementsByClassName('dialogBtnFh')[0];
		if(!callback2) {
			callback2 = function() {
				getCloseDialog();
			}
		}
		oBtnFh.onclick = callback2;
	}
}

// 关闭dialog
function getCloseDialog(time) {
	if(time == null || time == "") {
		time = 100;
	}
	if(document.getElementsByClassName('dialogs') != null && document.getElementsByClassName('dialogs') != "") {
		setTimeout("document.body.removeChild(document.getElementsByClassName('dialogs')[0])", time);
	}
}

// url路径后面拼接参数对应值
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null)
		return unescape(r[2]);
	return null;
}

// url路径后面拼接参数对应值
function getQueryStringFunc(funcurl, string) {
	if(string == "url") {
		return funcurl.split("?")[0];
	} else {
		funcurl = funcurl.split("?")[1];
		var reg = new RegExp("(^|&)" + string + "=([^&]*)(&|$)", "i");
		var r = funcurl.match(reg);
		if(r != null)
			return unescape(r[2]);
		return null;
	}
}

// result FFjson js
// 时间段选择 format为日期格式, format="yyyyMM"不带day
function dateSelectChange(select_date_value, format) {
	var data = new Date();
	var daybegin = data.getDate(); // 结束日期
	var dayend = "01"; // 开始日期
	if(daybegin < 10) {
		daybegin = ("0" + daybegin).toString();
	}
	// 最近三个月情况
	if(select_date_value == 0 || select_date_value == "") {
		var yearbegin = (data.getFullYear().toString());
		var monthbegin = data.getMonth() + 1;
		if(monthbegin > 3) {
			var yearend = (data.getFullYear().toString());
			var monthend = data.getMonth() + 1 - 3;
			if(monthbegin < 10) {
				monthbegin = "0" + monthbegin;
			}
			if(monthend < 10) {
				monthend = "0" + monthend;
			}
		} else {
			var yearend = (data.getFullYear() - 1).toString();
			var monthend = 3 + (data.getMonth() + 1);
			if(monthbegin < 10) {
				monthbegin = "0" + monthbegin;
			}
			if(monthend < 10) {
				monthend = "0" + monthend;
			}
		}
		if(format == "yyyyMM") {
			return yearend + "" + monthend + "——" + yearbegin + "" + monthbegin;
		} else {
			return yearend + "" + monthend + "" + dayend + "——" + yearbegin + "" + monthbegin + "" + daybegin;
		}
	}
	// 最近半年情况
	if(select_date_value == 1) {
		var yearbegin = (data.getFullYear().toString());
		var monthbegin = data.getMonth() + 1;
		if(monthbegin > 6) {
			var yearend = (data.getFullYear().toString());
			var monthend = data.getMonth() + 1 - 6;
			if(monthbegin < 10) {
				monthbegin = "0" + monthbegin;
			}
			if(monthend < 10) {
				monthend = "0" + monthend;
			}
		} else {
			var yearend = (data.getFullYear() - 1).toString();
			var monthend = 6 + (data.getMonth() + 1);
			if(monthbegin < 10) {
				monthbegin = "0" + monthbegin;
			}
			if(monthend < 10) {
				monthend = "0" + monthend;
			}
		}
		if(format == "yyyyMM") {
			return yearend + "" + monthend + "——" + yearbegin + "" + monthbegin;
		} else {
			return yearend + "" + monthend + "" + dayend + "——" + yearbegin + "" + monthbegin + "" + daybegin;
		}
	}
	// 最近一年情况
	if(select_date_value == 2) {
		var yearbegin = (data.getFullYear()).toString();
		var monthbegin = data.getMonth() + 1;
		if(monthbegin < 10) {
			monthbegin = "0" + monthbegin;
		}
		// 当年-1=上一年
		var yearend = (data.getFullYear() - 1).toString();
		var monthend = data.getMonth() + 1;
		if(monthend < 10) {
			monthend = "0" + monthend;
		}
		if(format == "yyyyMM") {
			return yearend + "" + monthend + "——" + yearbegin + "" + monthbegin;
		} else {
			return yearend + "" + monthend + "" + dayend + "——" + yearbegin + "" + monthbegin + "" + daybegin;
		}
	}
	// 最近两年情况
	if(select_date_value == 3) {
		var yearbegin = (data.getFullYear()).toString();
		var monthbegin = data.getMonth() + 1;
		if(monthbegin < 10) {
			monthbegin = "0" + monthbegin;
		}
		var yearend = (yearbegin - 2).toString();
		var monthend = monthbegin.toString();
		if(format == "yyyyMM") {
			return yearend + "" + monthend + "——" + yearbegin + "" + monthbegin;
		} else {
			return yearend + "" + monthend + "" + dayend + "——" + yearbegin + "" + monthbegin + "" + daybegin;
		}
	}
	// 自定义查询
	if(select_date_value == 4) {
		$("#div_date").hide();
		$("#div_change").show();
		$("#result").hide();
		$("#empty").hide();

	}
}

//如果格式2017-08-08注掉replace（）
function date_click(begintime, endtime, format) {

	// 去掉格式
	//		begintime = begintime.replace("-", "");
	//		endtime = endtime.replace("-", "");
	//		if(begintime.indexOf("-")>-1){
	//			begintime = begintime.replace("-", "");
	//		}
	//		if(endtime.indexOf("-")>-1){
	//			endtime = endtime.replace("-", "");
	//		}

	if(format == "yyyyMM" && begintime.indexOf("-") > -1 && endtime.indexOf("-") > -1) { // yyyyMM格式截取前六位，去掉day
		begintime = begintime.substr(0, 7);
		endtime = endtime.substr(0, 7);
	} else if(format == "yyyyMM") {
		begintime = begintime.substr(0, 6);
		endtime = endtime.substr(0, 6);
	}
	console.log(begintime + "--" + endtime)
	if(begintime > endtime) {
		alertMsg("开始时间不能大约结束时间");
		return;
	}

	$("#div_date").show();
	$("#div_change").hide();
	$("#result").show();

};

// 日期格式
function formatResult(format) {
	switch(format) {
		case "none":
			break;
		case "yyyyMM":
			$("#div_date").show();
			break;
		case "yyyyMMdd":
			$("#div_date").show();
			break;
		case "yyyy":
			$("#div_year").show();
			break;
		default:
			break;
	}
}

function resultQuery(ff, last, items, busy) {
	/**
	 *  result 里,单条查询下拉加载js
	 *  ff: 当前查询的集合;
	 *  last: 最后一页判断条件;
	 *  items: 整体集合;
	 *  busy: 上拉加载判断是否继续下一页,ture:不下拉刷新;false:下拉刷新;此为返回值,判断是否继续下拉刷新.
	 */
	if(ff.length == 0) {
		$("#empty").show();
	}
	if(last == false) { // data.end 字段是判断是否为最后一页，end字段可修改自己定义的
		if(ff.length > 0) {
			//false 不是最后一页
			for(var i = 0; i < ff.length; i++) {
				items.push(ff[i]);
			}
		}
		busy = false;
	} else if(last == true) { // true 最后一页
		for(var i = 0; i < ff.length; i++) {
			items.push(ff[i]);
		}
		busy = true; //不再下拉刷新

		if(items == null || items.length == 0) {
			busy = true; //不再下拉刷新
		}

	}
	if(items.length > 0) {
		$("#empty").hide();
	}
	return busy;
}

// 获取年份集合
function getYears() {
	var years = [];
	var year = new Date().getFullYear();
	for(i = year - 30; i < year; i++) {
		years.push(i)
	}
	for(j = year; j < year + 20; j++) {
		years.push(j)
	}
	return years;
}

// 获取月份集合
function getMonths() {
	var months = [];
	var month = new Date().getMonth() + 1;
	for(i = 1; i < 13; i++) {
		months.push(i)
	}
	return months;
}

function setCookie(name, value) {
	document.cookie = name + "=" + escape(value) + ";"; //+ ";expires=" + exp.toGMTString();
}

function setCookieV2(name, value) {
	document.cookie = name + "=" + escape(value) + ";domain=.neusoft.com"; //+ ";expires=" + exp.toGMTString();
}

//读取cookies
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

	if(arr = document.cookie.match(reg))

		return unescape(arr[2]);
	else
		return null;
}

function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function clearCookie() {
	var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
	if(keys) {
		for(var i = keys.length; i--;)
			document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString() + "; path=/";
	}
}

// 加载J2C
var jsReadyCallBack;

function Navi_JS_Ready(callback) {

	jsReadyCallBack = callback; {
		J2C.registerJ2CReadyCallback(function(event) {
			jsReadyCallBack();
		});
	}
}

/**
 * getUserInfo：从app端获得token 或者个人信息；
 * getToken：从返回信息里获取token；
 * getPersionInfo：从返回信息里获取个人信息；
 * getPersonInfo：从返回信息里获取其他信息
 * getPersonId：从返回信息里获取个人id;
 *
 */
var getUserInfoCallBack;

function getUserInfo(callback) {
	getUserInfoCallBack = callback;
	if(global_ep.pc) {
		getUserInfowechat();
	} else {
		console.log("commoon-=="+JSON.stringify(window.WeixinJSBridge))
		if(window.WeixinJSBridge){
			getUserInfowechat();
		} else {
			J2C.requestGetToken4NanNing(function(info) {

				getUserInfoCallBack(info);
			})
		}
		
	}
}

function getToken(tokenCall) {
	var obj = JSON.parse(tokenCall); //由JSON字符串转换为JSON对象
	var tem = "bearer" + ' ' + obj.token; //obj.personInfo.token_type
	return tem;
}

function getPersonInfo(tokenCall) { //不需要参保也可进行余下业务
	var obj = JSON.parse(tokenCall); //由JSON字符串转换为JSON对象
	var tem = obj.personInfo;
	return tem;
}

//正式环境下的获取个人id
function getPersonId(personInfoCall) {
	var obj = JSON.stringify(personInfoCall);
	var personIdObj = JSON.parse(obj);
	// var personId = personIdObj.familyexpand[0].personNo;
    var personId = "";
    if(personIdObj.associatedPersons.length > 0){
        personId = personIdObj.associatedPersons[0].id;
    }
	if(personId === "" || personId == null) {
		dialogMsg("对不起，未获取到您的参保信息！无法操作该业务！");
		return;
	}
	return personId;
}

// wechat 端获取用户信息
function getUserInfowechat() {
	// var obj = JSON.parse(localStorage.getItem("userInfo"));
	var obj = localStorage.getItem("PERSON_INFO");
	// alert(obj)
	getUserInfoCallBack(obj);

}

function getIdNumber(personInfoCall) {
	//					alert(JSON.stringify(personInfoCall));
	var obj = JSON.stringify(personInfoCall); //由JSON字符串转换为JSON对象
	//	 var personInfo_obj = obj.personInfo;
	var idNumberObj = JSON.parse(obj);
		//alert(idNumberObj.associatedPersons[0].idNumber);
	// return idNumberObj.familyexpand[0].idCardNo;
	return idNumberObj.idNumber;
//	return idNumberObj.associatedPersons[0].idNumber;
}

function getuserName(personInfoCall) {
	var obj = JSON.stringify(personInfoCall); //由JSON字符串转换为JSON对象
	//	 var personInfo_obj = obj.personInfo;
	var idNumberObj = JSON.parse(obj);
	//alert(idNumber);
	//return idNumberObj.name;
    var name = "";
    if(idNumberObj.associatedPersons.length > 0){
        name = idNumberObj.associatedPersons[0].name;
    }

	return name;
}

function getMobile(personInfoCall) {
	// alert(JSON.stringify(personInfoCall))
	var obj = JSON.stringify(personInfoCall); //由JSON字符串转换为JSON对象
	//	 var personInfo_obj = obj.personInfo;
	var mobileobj = JSON.parse(obj);
	// alert("mobileobj= "+mobileobj);
	return mobileobj.mobile;
}

// 封装固定模板---返回信息， res返回整个信息体response
function updResponse(res) {
	if(!isStatus(res.status)) {
		// status 不是200-300之间，失败
		if(isEmpty(res.data.detail)) {
			res.data.infomessage = res.data.detail;
		} else if(isEmpty(res.data.message)) {
			res.data.infomessage = res.data.message;
		} else {
			var data = {};
			res.data.infomessage = "请求失败！";
		}
		if(res.data.detail == "此身份证号未注册") {
			$("#passwordshow").show();
			$("#footid").show();
		}
		res.data.infocode = "0";

	} else {
		// 成功 其余情况业务里自己判断 , wechat 返回空串，也是成功的一种
		if(res.data == "") {
			// data里数据为空
			var data = {};
			data.infocode = "1";
			data.infomessage = ""; //也是成功，但可能没有数据
			res.data = data;
            data.data = res.data;
        }
		// else if(res.data.length > 0) {  // res.data 是集合形式，在套一层data
		// 	var data = {};
		// 	data.infocode = "1";
		// 	data.infomessage = "";
		// 	data.data = res.data;
		// 	res.data = data;
		// }
		else {  // 返回res.data是对象，直接添加
			var data={};
			res.data.infocode = "1";
			res.data.infomessage = "";
            data.data = res.data;

        }
	}

	return res;
}

function updResponseforMobile(res) {
	if((isEmpty(res.appcode) || res.appcode == "0" || res.appcode == "1") && isStatus(res.status)) {
		// if (isEmpty(res.appcode) && isStatus(res.status)) {
		//申报,有appcdoe,
		if(res.appcode == "1") {
			// 申报成功
			res.data.infocode = res.appcode;
            if(isEmpty(res.infomessage)) {
                //如果有错误信息
                console.log("有错误信息")
                res.data.infomessage = res.infomessage;
            } else {
                //没有错误信息
                // var data = {};
                console.log("没有错误信息")
                res.data.infomessage = "";
            }
		} else if(res.appcode == "0") {
			// 申报失败
			res.data.infocode = res.appcode;
            if(isEmpty(res.infomessage)) {
                //如果有错误信息
                console.log("有错误信息")
                res.data.infomessage = res.infomessage;
            } else {
                //没有错误信息
                // var data = {};
                console.log("没有错误信息")

                res.data.infomessage = "未知错误！";
            }
		} else {
			res.data.infocode = "0";
            if(isEmpty(res.infomessage)) {
                //如果有错误信息
                console.log("有错误信息")
                res.data.infomessage = res.infomessage;
            } else {
                //没有错误信息
                // var data = {};
                console.log("没有错误信息")

                res.data.infomessage = "未知错误！";
            }
		}
	} else {
		// alert("没有appcode／或者请求失败")
		// 查询／没有appcode／或者请求失败
		if(!isStatus(res.status)) {
			// status 不是200-300之间，失败
			if(isEmpty(res.infomessage)) {
				res.data.infomessage = res.infomessage;
			} else {
				res.data.infomessage = "未知错误！";
			}

			res.data.infocode = "0";

		} else {
			// 成功 其余情况业务里自己判断
			if(res.data == "") {
				// data里数据为空
				var data = {};
				data.infocode = "1";
				if(isEmpty(res.infomessage)) {
					res.data.infomessage = res.infomessage;
				} else {
					res.data.infomessage = "对不起，未查询到您想要的信息！";
				}
				res.data = data;
			}   else {
				res.data.infocode = "1";
				if(isEmpty(res.infomessage)) {
					res.data.infomessage = res.infomessage;
				} else {
					res.data.infomessage = "对不起，未查询到您想要的信息！";
				}
			}
		}
	}
	console.log("封装方法结束" + JSON.stringify(res))

	return res;
}

// 判断pc浏览器或移动端浏览器版本
function browserRedirect() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	//	var md = new MobileDetect(sUserAgent); //初始化mobile-detect
	console.log(sUserAgent)
	if(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		// 是移动终端
		console.log("phone--hls")
	}
}

// actionsheet select下拉列表
function actionSheetMenu(length, multi) {
	if(multi) {
		multi = true;
	} else {
		multi = false;
	}
	var mask = $('.weui-mask-h');
	var weuiActionsheet = $('.weui-actionsheet-h');
	var sheetALength = parseInt((window.screen.availHeight - 70) / 48);
	weuiActionsheet.addClass('weui-actionsheet_toggle');

	mask.show()
		.focus() //加focus是为了触发一次页面的重排(reflow or layout thrashing),使mask的transition动画得以正常触发
		.addClass('weui-mask---visible').one('click', function() {
			hideActionSheet(weuiActionsheet, mask);
		});
	mask.unbind('transitionend').unbind('webkitTransitionEnd');
	// if(length > 7) {
	//     weuiActionsheet.addClass('weui-height-full');
	// } else {
	//     weuiActionsheet.removeClass('weui-height-full');
	// }
	$('.weui-actionsheet__cell').focus().on('click', function(e) {
		$(this).addClass("icon-yes1-con");
		$(this).siblings().removeClass("icon-yes1-con");
		hideActionSheet(weuiActionsheet, mask);
	});
	$('.action_close').one('click', function() {
		hideActionSheet(weuiActionsheet, mask);
	});
	mask.one('click', function() {
		hideActionSheet(weuiActionsheet, mask);
	});
	function hideActionSheet(weuiActionsheet, mask) {
		weuiActionsheet.removeClass('weui-actionsheet_toggle');
		weuiActionsheet.removeClass('weui-height-full');
		mask.removeClass('weui-mask---visible');
		mask.hide();
	}
}

// 身份证加密，中间生日变*
function plusXing(str) {
	var frontLen = 6;
	var endLen = 4;
	var len = str.length - frontLen - endLen;
	var xing = '';
	for(var i = 0; i < len; i++) {
		xing += '*';
	}
	return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
}

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for(var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable) {
			return pair[1];
		}
	}
	return(false);
}

/**
 * 图片压缩处理
 * sourceImgObj：原图；
 * quality：输出图片的质量，最高100；
 * angleOffset：横屏竖屏转换角度
 * outputFormat：浏览器中的data类型的Url格式,data:image/png,data:image/jpeg;
 *
 */
function compressImg(sourceImgObj, quality, angleOffset, outputFormat) {
	quality = quality || .8;
	angleOffset = angleOffset || 0;
	var mimeType = "image/jpeg";
	if(outputFormat != undefined && outputFormat == "png") {
		mimeType = "image/png";
	}
	var drawWidth = sourceImgObj.naturalWidth,
		drawHeight = sourceImgObj.naturalHeight;
	// IOS 设备上 canvas 宽或高如果大于 1024，就有可能导致应用崩溃闪退
	// 因此这里需要缩放
	var maxSide = Math.max(drawWidth, drawHeight);
	if(maxSide > 1024) {
		var minSide = Math.min(drawWidth, drawHeight);
		minSide = minSide / maxSide * 1024;
		maxSide = 1024;
		if(drawWidth > drawHeight) {
			drawWidth = maxSide;
			drawHeight = minSide;
		} else {
			drawWidth = minSide;
			drawHeight = maxSide;
		}
	}
	var cvs = document.createElement('canvas');
	var ctx = cvs.getContext("2d");
	if(angleOffset) {
		cvs.width = drawHeight;
		cvs.height = drawWidth;
		ctx.translate(drawHeight, 0);
		ctx.rotate(angleOffset * Math.PI / 180);
	} else {
		cvs.width = drawWidth;
		cvs.height = drawHeight;
	}
	ctx.drawImage(sourceImgObj, 0, 0, drawWidth, drawHeight);
	var newImageData = cvs.toDataURL(mimeType, quality || .8);
	return newImageData;
}

/*
 *  日期差
 *  startdate ：开始时间
 *  enddate ： 结束时间
 * */
function DateDiff(startdate, enddate) {
	var day = 24 * 60 * 60 * 1000;
	if(startdate.indexOf("-") > 0) {
		var dateArr = startdate.split("-");
		var checkDate = new Date();
		checkDate.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2]);
		var checkTime = checkDate.getTime();
	} else {
		var checkDate = new Date();
		checkDate.setFullYear(startdate.substring(0, 4), parseInt(startdate.substring(4, 6)) - 1, startdate.substring(6, 8));
		var checkTime = checkDate.getTime();
	}
	if(enddate.indexOf("-") > 0) {
		var dateArr2 = enddate.split("-");
		var checkDate2 = new Date();
		checkDate2.setFullYear(dateArr2[0], dateArr2[1] - 1, dateArr2[2]);
		var checkTime2 = checkDate2.getTime();
	} else {
		var checkDate2 = new Date();
		checkDate2.setFullYear(enddate.substring(0, 4), parseInt(enddate.substring(4, 6)) - 1, enddate.substring(6, 8));
		var checkTime2 = checkDate2.getTime();
	}
	var cha = parseInt((checkTime - checkTime2) / day);
	if(cha < 0) {
		cha = -cha;
	}
	return cha;
}

/**
 *  根据开始日期，中间相差天数，查询结束日期
 *  startdate ：开始日期
 *  dayCha ：日期差
 * */
function getEndDate(startdate, dayCha) {
	dayCha = dayCha || 1;
	var daytime = 24 * 60 * 60 * 1000 * dayCha;
	if(startdate.indexOf("-") > 0) {
		var dateArr = startdate.split("-");
		var checkDate = new Date();
		checkDate.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2]);
		var checkTime = checkDate.getTime();
	} else {
		var checkDate = new Date();
		checkDate.setFullYear(startdate.substring(0, 4), parseInt(startdate.substring(4, 6)) - 1, startdate.substring(6, 8));
		var checkTime = checkDate.getTime();
	}
	checkTime += daytime;
	return timestampToTime(checkTime);
}

// 时间戳---转换成时间
function timestampToTime(timestamp) {
	var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
	var h = " " + date.getHours() + ':';
	var m = date.getMinutes() + ':';
	var s = date.getSeconds();
	return Y + M + D;
}
// 对象obj 转变url后面拼接的字符串  ， ?a=a&b=b
function setObjUrlString(obj){
	var temp = "?";
	for(var i in obj){//用javascript的for/in循环遍历对象的属性
		temp += i+"="+obj[i]+"&";
	} 
	var tp = (temp.substring(temp.length-1) == "&") ? temp.substring(0,temp.length-1) : temp;
	return tp;
}
// 二级码转换  ，arr1:需要转换的集合；arr2:二级码列表；str:字段名称
function putData(arr1, arr2, str) {
	if(typeof arr1 == 'string'){
		return;
	}
	if(!!arr1.length){
		angular.forEach(arr1, function(datas_list, index) {
			var sublabel = "";
			if(arr1[index][str].indexOf(",") > 0) {  // 查询的字段名给的是多个形式，以","分开
				var substr = arr1[index][str].split(",");
				angular.forEach(arr2, function(datas) {
					for(i = 0; i < substr.length; i++) {
						if(substr[i] == datas.VALUE) {
							sublabel = sublabel + "," + datas.NAME;
							sublabel = sublabel.substring(0, 1) == "," ? sublabel.substr(1) : sublabel;
						}
					}
					console.log(sublabel)
				});
				arr1[index][str] = sublabel;
			} else {
				angular.forEach(arr2, function(datas) {
					if(arr1[index][str] == datas.VALUE) {
						arr1[index][str] = datas.NAME;
					}
				});
			}
		});
	} else {
		angular.forEach(arr2, function(datas) {
			if(arr1[str] == datas.VALUE) {
				arr1[str] = datas.NAME;
			}
		});
	}
	

}
function Map() {
    this.elements = new Array();
 	/** 存放数据 */    
    this.data = new Object(); 
    //获取MAP元素个数
    this.size = function() {
        return this.elements.length;
    }
 
    //判断MAP是否为空
    this.isEmpty = function() {
        return (this.elements.length < 1);
    }
 
    //删除MAP所有元素
    this.clear = function() {
        this.elements = new Array();
    }
 
    //向MAP中增加元素（key, value) 
    this.put = function(_key, _value) {
//      this.elements.push( {
//          key : _key,
//          value : _value
//      });
		if(this.data[_key] == null){     
            this.elements.push(_key);     
        }     
        this.data[_key] = _value;     
    }
 
    //删除指定KEY的元素，成功返回True，失败返回False
    this.remove = function(_key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    }
 
    //获取指定KEY的元素值VALUE，失败返回NULL
    this.get = function(_key) {
        try {
//          for (i = 0; i < this.elements.length; i++) {
//              if (this.elements[i].key == _key) {
//                  return this.elements[i].value;
//              }
//          }
            for (k in this.data) {
                if (k == _key) {
//                  return this.elements[i].value;
					console.log(this.data[_key])
                }
            }
        } catch (e) {
            return null;
        }
    }
    
    //获取指定KEY的元素值VALUE，失败返回NULL
    this.upd = function(_key,_value) {
        try {
            for (k in this.data) {
                if (k == _key) {
                    this.data[_key] = _value;
                }
            }
        } catch (e) {
            return null;
        }
    }
 
    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
    this.element = function(_index) {
        if (_index < 0 || _index >= this.elements.length) {
            return null;
        }
        return this.elements[_index];
    }
 
    //判断MAP中是否含有指定KEY的元素
    this.containsKey = function(_key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    }
 
    //判断MAP中是否含有指定VALUE的元素
    this.containsValue = function(_value) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].value == _value) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    }
 
    //获取MAP中所有VALUE的数组（ARRAY）
    this.values = function() {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].value);
        }
        return arr;
    }
 
    //获取MAP中所有KEY的数组（ARRAY）
    this.keys = function() {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].key);
        }
        return arr;
    }
}
// 判断是否为空
function isEmpty(obj) {
	if(obj == null || obj == '' || typeof obj == 'undefined') {
		return false;
	} else {
		return true;
	}
}
// 判断对象是否为空
function isEmptyObject(obj) {
	for(var name in obj) {
		return false;
	}
	return true;
}
var checkMap = new Map();
// 根据查询出集合，显示页面对象，返回新增的项目入参
function getGroupList(list){
	var data = {};
	if(list.length > 0) {
		// 初始化，默认值生成一个新的对象
		for(i = 0; i < list.length; i++) {
			for(j = 0; j < list[i].groupInfo.length; j++) {
				var na = list[i].groupInfo[j].name;
				if(isEmpty(na)){
					if(list[i].groupInfo[j].type=='checkbox'){
						// check多选
						if(list[i].groupInfo[j].subInfo.isselected){
							for(c = 0;c<list[i].groupInfo[j].subInfo.info.length;c++){
								checkMap.put(list[i].groupInfo[j].subInfo.info[c].name,list[i].groupInfo[j].subInfo.info[c].subInfo.showValue);
								data[na] = checkMap.data;
							}
						} else {
							data[na] = {};
						}
						
					} else if(list[i].groupInfo[j].type=='image' || list[i].groupInfo[j].type=='file'){
						// image,file文件显示							
						data[na] = list[i].groupInfo[j].subInfo.orid;
					} else {
						// input,select,label显示
						data[na] = list[i].groupInfo[j].subInfo.showValue;
					}
				}
			}
		}
	}
	return data;
}
// 将修改的数据，合并到数据里
function updProConf(confList,data){
	if(!isEmptyObject(confList)){  
		for(key in confList){
			if(typeof confList[key] == "object"){
				for(updkey in confList[key]){
					checkMap.upd(updkey,confList[key][updkey]);
					data[key] = checkMap.data
				}
			} else {
				data[key] = confList[key];
			}
		}
	}
	return data;
}
