var app = angular.module("IndexApp", ['ui.bootstrap']);
app.controller("IndexCtrl", function($scope, $http, $rootScope, $modal) {
	$scope.btnSaveType = "add";
	$scope.pdetail=JSON.parse(localStorage.getItem("pdetail"));
	
	//1.获取证书类型list
	$scope.getZsList = function() {
		
		var url = "/api/project/apple/type";
		//var url = "/vconsole/project/apple/type";
		document.getElementById("loading").style.display = "block";
		$http({
			method: 'get',
			headers: {
					'Access-Control-Allow-Origin': '*'
				},
			url: url
		}).then(function successCallback(response) {
			document.getElementById("loading").style.display = "none";
			if(response.data.data != null) {
				$scope.zslist = response.data.data;
				$scope.myone=response.data.data[0].code;
				console.log("证书二级代码："+JSON.stringify($scope.zslist));
			}

		}, function errorCallback(response) {
			document.getElementById("loading").style.display = "none";
			// 请求失败执行代码
			alert("errorCallback=" + JSON.stringify(response.data.msg));
		});
	}
	$scope.getZsList();

	
	//2.提交证书接口
	$scope.btnSaveAppParent = function() {	
		if($scope.p12path!=null&&$scope.p12pasw!=null&&$scope.des!=null&&$scope.myone!=null
		&&$scope.mail!=null){
			$scope.zsinfo={};
			$scope.zsinfo.pid=$scope.pdetail.pid ;  //测试先写死
				$scope.zsinfo.des=$scope.des;
				$scope.zsinfo.p12path=$scope.p12path;
				$scope.zsinfo.p12pasw=$scope.p12pasw;
				$scope.zsinfo.propath=$scope.propath;
				$scope.zsinfo.type=$scope.myone;
				$scope.zsinfo.mail=$scope.mail;
		var url = "/api/project/apple/add";
//			var url = "/vconsole/project/apple/add";
		document.getElementById("loading").style.display = "block";
		$http({
			method: 'post',
			data:$scope.zsinfo,
			url: url
		}).then(function successCallback(response) {
			document.getElementById("loading").style.display = "none";
			if(response.data.success=="1") {
				
				alert("提交证书信息成功！")
				console.log("提交证书："+JSON.stringify(response.data));
			}

		}, function errorCallback(response) {
			document.getElementById("loading").style.display = "none";
			// 请求失败执行代码
			alert("errorCallback=" + JSON.stringify(response.data.msg));
		});
		}else{
			alert("请填写完整信息！");
		}

	}
	
	
	

//	$("#file_img").on("click",function(){
//		var upimgIdp = document.querySelector("#file_img");
//		upimgIdp.addEventListener('change', function(e) {
//			var files = this.files;
//			console.log(files[0])
//			$scope.fs = files[0];
//		});
//	})
//	$("#file_p12").on("click",function(){
//		var upimgIdp = document.querySelector("#file_p12");
//		upimgIdp.addEventListener('change', function(e) {
//			var files = this.files;
//			console.log(files[0])
//			$scope.fs12 = files[0];
//		});
//	})
//	//3.上传--描述文件
//	$scope.despfile=function(){
//		var fd = new FormData();
//		fd.append("file",$scope.fs);
//		console.log(fd);
//      var url="/resource/applefile/uploadpro";
//		$http({
//			method:"post",
//			headers: {
//				"Content-Type": undefined,
//				"Access-Control-Allow-Origin": '*'
//			},
//			data:fd,
//			url:url,
//			transformRequest: angular.identity,
//		}).then(function successCallback(response){
//			if(response.data.issucess=="1"){
//					$scope.propath=response.data.data.fileid;
//					console.log("文件描述pid:"+$scope.propath);
//				alert("描述文件上传成功，撒花*★,°*:.☆(￣▽￣)/$:*.°★* 。")
//			}
//		
//			
//		}),function errorCallback(response){
//			alert("描述文件上传失败");
//		}
//		
//	}
//	//4.上传--p12
//	$scope.despp12=function(){
//		var fd = new FormData();
//		fd.append("file12",$scope.fs12);
//		console.log($scope.fs12);
//		console.log(fd);
//		var url="/resource/applefile/uploadp12";
//		$http({
//			method:"post",
//			headers: {
//				"Content-Type": undefined,
//				"Access-Control-Allow-Origin": '*'
//			},
//			data:fd,
//			url:url,
//			transformRequest: angular.identity,
//		}).then(function successCallback(response){
//			if(response.data.issucess=="1"){
//					$scope.p12path=response.data.data.fileid;
//					console.log("p12文件描述pid:"+$scope.p12path);
//				alert("p12文件上传成功，撒花*★,°*:.☆(￣▽￣)/$:*.°★* 。")
//			}else{
//				alert("p12文件上传失败");
//			}
//			
//		}),function errorCallback(response){
//			alert("p12文件上传失败");
//		}
//		
//	}

	
//添加证书模态
	$scope.btnAddZs = function() {
		$scope.appZsInfo = {};
		$scope.openModal();
//		$scope.$apply();
	}
	
	//获取证书列表
	$scope.zhengshuLists=function(){
		
		//var url = "/vconsole/project/apple/list?pid="+"4fa90560-c06f-11e8-801d-3f0dba9ef909";
		var url="/api/project/apple/list?pid="+$scope.pdetail.pid;
//		var url="/vconsole/project/apple/list?pid="+$scope.pdetail.pid;
		document.getElementById("loading").style.display = "block";
		$http({
			method: 'get',
			headers: {
					'Access-Control-Allow-Origin': '*'
				},
			url: url
		}).then(function successCallback(response) {
			console.log(response)
			document.getElementById("loading").style.display = "none";
			if(response.data.issucess =="1") {
				$scope.zhengshus= response.data.data;
				console.log("证书列表s："+JSON.stringify($scope.zhengshus));
			}

		}, function errorCallback(response) {
			document.getElementById("loading").style.display = "none";
			// 请求失败执行代码
			alert("errorCallback=" + JSON.stringify(response.data.msg));
		});
	}
	$scope.zhengshuLists();
	
	$scope.openModal = function () {
        $('body').on("touchmove", function (e) {
            e.preventDefault();
        }, false);
        var modalInstance = $modal.open({
            templateUrl: './packagechild.html', //script标签中定义的id
            controller: 'addCtrl', //modal对应的Controller
            resolve: {
                data: function () { //data作为modal的controller传入的参数
                    data = {
                    	"pdetail":$scope.pdetail
                    };
                    return data; //用于此页面向模态页面传递数据
                }
            }
        });
        modalInstance.result.then(function (result) {
        	console.log(result)
        	$scope.result=result;
        	$scope.zhengshuLists();
        	$(".modal-backdrop").display=none;

        }, function (reason) {
            console.log(reason); // 点击空白区域，总会输出backdrop
            // click，点击取消，则会暑促cancel
            // $log.info('Modal dismissed at: ' + new Date());
        });
    }
	$scope.radioSubmit=function(app){
		$scope.radioOne=app;
	}
	
	//打包 操作
	$scope.btnDabaso=function(app){
	
		var url="/api/project/pack";
//		var url="/vconsole/project/pack";
		var info={};
		var pack={};
		
		pack.appleid=$scope.radioOne.appleid;
		pack.tag=$scope.tag;
		info.pack=pack;
		info.pid=$scope.radioOne.pid;
		document.getElementById("loading").style.display = "block";
		$http({
			method: 'post',
			headers: {
					'Access-Control-Allow-Origin': '*'
				},
			data:info,
			url: url
		}).then(function successCallback(response) {
			console.log(response)
			document.getElementById("loading").style.display = "none";
			if(response.data.issucess =="1") {
				
				alert("打包成功！！撒花*★,°*:.☆(￣▽￣)/$:*.°★* 。")
			}

		}, function errorCallback(response) {
			document.getElementById("loading").style.display = "none";
			// 请求失败执行代码
			alert("errorCallback=" + JSON.stringify(response.data.msg));
		});
	
	}

});