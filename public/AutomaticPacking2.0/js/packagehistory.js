var app = angular.module("IndexApp", []);

app.controller("IndexCtrl", function($scope, $http) {
	$scope.pagesize=10;
	$scope.pageno=0; //第一页
	$scope.nextpage=true;
	//1.获取打包历史list
	$scope.gethistoryList = function() {
		$scope.detail=JSON.parse(localStorage.getItem("historypdetail"));
		
		var url = "/api/project/packhistory?pid="+$scope.detail.pid+"&pagesize="+$scope.pagesize+"&pageno="+$scope.pageno;
//测试	//var url = "/vconsole/project/packhistory?pid="+$scope.detail.pid+"&pagesize="+$scope.pagesize+"&pageno="+$scope.pageno;
	//var url = "/vconsole/project/packhistory?pid=2ecf1e70-c3b6-11e8-a52e-0707324c9509&pagesize=2&pageno=0";
		document.getElementById("loading").style.display = "block";
		$http({
			method: 'get',
			headers: {
					'Access-Control-Allow-Origin': '*'
				},
			url: url
		}).then(function successCallback(response) {
			document.getElementById("loading").style.display = "none";
			if(response.data.issucess =="1") {
				if(response.data.data.length>0){
					$scope.nextpage=true;
					$scope.historylist = response.data.data;
				
			     	console.log("获取打包历史："+JSON.stringify($scope.historylist));
					
				}else{
					alert("很抱歉，当前项目没有更多打板历史！");
					$scope.nextpage=false;
					
				}
				
			}

		}, function errorCallback(response) {
			document.getElementById("loading").style.display = "none";
			// 请求失败执行代码
			alert("errorCallback=" + JSON.stringify(response.data.msg));
		});
	}
	
	$scope.gethistoryList();
	
		$scope.radioSubmit=function(app){
		$scope.radioOne=app;
	}
		
	//2.获取打包历史下一页
	$scope.gethistoryNext = function() {
		$scope.pageno=$scope.pageno+1;
		$scope.gethistoryList();
		
	}
	//4.获取打包历史上一页
		$scope.gethistoryBack = function() {
			$scope.pageno=$scope.pageno-1;
			$scope.gethistoryList();
	}
	
	// 3.重新打包 操作
	$scope.rebtnDabaso=function(){
	
		var url="/api/project/pack";
//		var url="/vconsole/project/pack";
		var info={};
		var pack={};
		
		pack.appleid=$scope.radioOne.appleid;
		pack.tag=$scope.radioOne.tag;
		info.pack=pack;
		info.pid=$scope.radioOne.pid;
		info.hid=$scope.radioOne.hid;
		info.mail=$scope.mail;
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
				
				alert("重新打包成功！！撒花*★,°*:.☆(￣▽￣)/$:*.°★* 。");
				$scope.gethistoryList();
			}

		}, function errorCallback(response) {
			document.getElementById("loading").style.display = "none";
			// 请求失败执行代码
			alert("errorCallback=" + JSON.stringify(response.data.msg));
		});
	
	}

});