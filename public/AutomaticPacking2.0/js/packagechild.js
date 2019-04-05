//var app = angular.module("IndexApp", []);
//var app = angular.module("", []);
app.controller("addCtrl", function($scope, $http, $modalInstance, data) {
	
    window.document.ontouchend = function () {
        $('body').off("touchmove");
    }
	$scope.pdetail = data;
	$scope.pname=data.pdetail.pname;
	$scope.pid=data.pdetail.pid;
	console.log(JSON.stringify(data));
	$scope.btnSaveType = "add";
	
	//1.获取证书类型list
	$scope.getZsList = function() {
		
		var url = "/api/project/apple/type";
//		var url = "/vconsole/project/apple/type";
//		var url="../json/packagechild.json";  //测试假数据
//		document.getElementById("loading").style.display = "block";
		$http({
			method: 'get',
			headers: {
					'Access-Control-Allow-Origin': '*'
				},
			url: url
		}).then(function successCallback(response) {
//			document.getElementById("loading").style.display = "none";
			if(response.data.data != null) {
				$scope.zslist = response.data.data;
				$scope.myone=response.data.data[0].code;
				console.log("证书二级代码："+JSON.stringify($scope.zslist));
			}

		}, function errorCallback(response) {
//			document.getElementById("loading").style.display = "none";
			// 请求失败执行代码
			alert("errorCallback=" + JSON.stringify(response.data.msg));
		});
	}
	$scope.getZsList();
	
	//2.提交证书接口
	$scope.btnSaveAppParent = function() {	
		if($scope.p12path!=null&&$scope.p12pasw!=null&&$scope.des!=null&&$scope.myone!=null){
			    $scope.zsinfo={};
			    $scope.zsinfo.pid=$scope.pid ;  
				$scope.zsinfo.des=$scope.des;
				$scope.zsinfo.p12path=$scope.p12path;
				$scope.zsinfo.p12pasw=$scope.p12pasw;
				$scope.zsinfo.propath=$scope.propath;
				$scope.zsinfo.type=$scope.myone;
				
		var url = "/api/project/apple/add";
//			var url = "/vconsole/project/apple/add";
//		document.getElementById("loading").style.display = "block";
		$http({
			method: 'post',
			data:$scope.zsinfo,
			url: url
		}).then(function successCallback(response) {
//			document.getElementById("loading").style.display = "none";
			if(response.data.issucess=="1") {
				
				alert("提交证书信息成功！")
				console.log("提交证书："+JSON.stringify(response.data));
				var data = {
		            "p12path": $scope.p12path,
		            "propath":$scope.propath
		        }
		        $modalInstance.close(data);
			}

		}, function errorCallback(response) {
//			document.getElementById("loading").style.display = "none";
			// 请求失败执行代码
			alert("errorCallback=" + JSON.stringify(response.data.msg));
		});
		}else{
			alert("请填写完整信息！");
		}

	}
	
	
	

	$("#file_img").on("click",function(){
		var upimgIdp = document.querySelector("#file_img");
		upimgIdp.addEventListener('change', function(e) {
			var files = this.files;
			console.log(files[0])
			$scope.fs = files[0];
		});
	})
	$("#file_p12").on("click",function(){
		var upimgIdp = document.querySelector("#file_p12");
		upimgIdp.addEventListener('change', function(e) {
			var files = this.files;
			console.log(files[0])
			$scope.fs12 = files[0];
			console.log($scope.fs12)
		});
	})
	//3.上传--描述文件
	$scope.despfile=function(){
		var upimgIdp = document.querySelector("#file_img");
//		upimgIdp.addEventListener('change', function(e) {
			$scope.fs = upimgIdp.files[0];
			console.log($scope.fs)
//		});	
		var fd = new FormData();
		fd.append("file",$scope.fs);
		console.log(fd);
        var url="/resource/applefile/uploadpro";
		$http({
			method:"post",
			headers: {
				"Content-Type": undefined,
				"Access-Control-Allow-Origin": '*'
			},
			data:fd,
			url:url,
			transformRequest: angular.identity,
		}).then(function successCallback(response){
			if(response.data.issucess=="1"){
					$scope.propath=response.data.data.fileid;
					
					console.log("文件描述pid:"+$scope.propath);
				alert("描述文件上传成功，撒花*★,°*:.☆(￣▽￣)/$:*.°★* 。");
				
			}
		
			
		}),function errorCallback(response){
			alert("描述文件上传失败");
		}
		
	}
	//4.上传--p12
	$scope.despp12=function(){
		var upimgIdp = document.querySelector("#file_p12");
//		upimgIdp.addEventListener('change', function(e) {
			$scope.fs12 = upimgIdp.files[0];
			console.log($scope.fs12)
//		});	
		$scope.fd12 = new FormData();
		$scope.fd12.append("file12",$scope.fs12);
		console.log($scope.fd12);
		var url="/resource/applefile/uploadp12";
		$http({
			method:"post",
			headers: {
				"Content-Type": undefined,
				"Access-Control-Allow-Origin": '*'
			},
			data:$scope.fd12,
			url:url,
			transformRequest: angular.identity,
		}).then(function successCallback(response){
			if(response.data.issucess=="1"){
					$scope.p12path=response.data.data.fileid;
					console.log("p12文件描述pid:"+$scope.p12path);
				alert("p12文件上传成功，撒花*★,°*:.☆(￣▽￣)/$:*.°★* 。")
			}else{
				alert("p12文件上传失败");
			}
			
		}),function errorCallback(response){
			alert("p12文件上传失败");
		}
		
	}
	
	$scope.close = function () {

        var data = {
            
        }
        $modalInstance.close(data);
    }

});