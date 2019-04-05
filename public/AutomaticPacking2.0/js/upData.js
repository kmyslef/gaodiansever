var app = angular.module("appConsole", []);
app.controller("appupdateController", function($scope, $http) {

	$scope.tempAppInfo = JSON.parse(localStorage.getItem("detail"));
	$scope.groupid = localStorage.getItem("groupid");
	$scope.appUpdateList = [];

	//查看版本
	$scope.allverlist = function() {
		var url = "/testreq/appinfo/verlist?groupid=" + $scope.groupid + "&appid=" + $scope.tempAppInfo.appid;
		document.getElementById("loading").style.display = "block";
		$http({
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*'
			},
			url: url
		}).then(function successCallback(response) {
			document.getElementById("loading").style.display = "none";
			$scope.appUpdateList = response.data.data;
		}, function errorCallback(response) {
			document.getElementById("loading").style.display = "none";
			// 请求失败执行代码
			alert("errorCallback=" + JSON.stringify(response.data));
		});
	}

	$scope.allverlist();

	//新增App信息页面
	$scope.btnAddAppUpdateInfo = function() {
		$scope.btnSaveType = "add";
	}

	//添加App版本
	$scope.btnSaveAppUpdateInfo = function() {
		var url = "/testreq/appinfo/addver?groupid=" + $scope.groupid + "&appid=" + $scope.tempAppInfo.appid;
		document.getElementById("loading").style.display = "block";
		$http({
			method: 'POST',
			data: $scope.appUpdateInfo,
			headers: {
				'Access-Control-Allow-Origin': '*'
			},
			url: url
		}).then(function successCallback(response) {
			document.getElementById("loading").style.display = "none";
			alert("添加成功!");
			$scope.appUpdateInfo = {};
			$scope.allverlist();
		}, function errorCallback(response) {
			document.getElementById("loading").style.display = "none";
			// 请求失败执行代码
			alert("errorCallback=" + JSON.stringify(response.data));
		});

		$scope.$apply();
	}

	//删除版本
	$scope.btnDelAppUpdateInfo = function(app) {
		if(confirm("你确定删除 " + app.fcname + " 吗？")) {

			var url = "/testreq/appinfo/delver?groupid=" + $scope.groupid + "&appid=" + $scope.tempAppInfo.appid + "&pid=" + app.udpid;
			document.getElementById("loading").style.display = "block";
			$http({
				method: 'POST',
				//			data: $scope.appUpdateInfo,
				headers: {
					'Access-Control-Allow-Origin': '*'
				},
				url: url
			}).then(function successCallback(response) {
				document.getElementById("loading").style.display = "none";
				alert("删除成功！");
				$scope.allverlist();
				$scope.$apply();
			}, function errorCallback(response) {
				document.getElementById("loading").style.display = "none";
				// 请求失败执行代码
				alert("errorCallback=" + JSON.stringify(response.data));
			});

		} else {
			//			alert("点击了取消");
		}

		$scope.$apply();
	}
	
	//返回上一界面
	$scope.btnBack = function() {
		history.back();
	}
	
	//刷新界面
	$scope.btnRefreshInfo = function() {
		window.location.reload();
	}

});