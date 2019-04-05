var app = angular.module("IndexApp", ['ui.bootstrap']);
app.controller("IndexCtrl", function($scope, $http, $cacheFactory,$rootScope, $modal) {
	//	$scope.groupList = [{"groupid":"122","groupname":"哈哈哈1","url":"http://baidu.com","des":"sddsf"},{"groupid":"123","groupname":"哈哈31","url":"http://baidu.com","des":"sdds1111f"},{"groupid":"16af8007-701e-4514-a734-b9d5790a4b05","groupname":"哈哈32","url":"http://baidu.com","des":"sdds11你好11f"},{"groupid":"3d9c7f3c-eb87-4565-8777-9c701d7af851","groupname":"哈哈32","url":"http://baidu.com","des":"sdds11你好11f"}];
	$scope.groupList = [];
	$scope.appParentList = [];
	$scope.groupInfo = {};
	$scope.appParentInfo = {};
	$scope.tempAppInfo = {};
	$scope.appList = [];
	$scope.appDetail = false;
	$scope.appindex = true;
	$scope.pagesize = 8;
	$scope.pageno = 0; // 第一页
	$scope.conf = {}; // 修改集合
	$scope.data = {}; // 整体提交集合
	$scope.data.pro = {};
	$scope.detail = {};
	//	$("#loading").fadeOut(500);

	//获取groupList  wjs
	$scope.getGroupList = function() {
		document.getElementById("loading").style.display = "block";
		var url = "/api/group/list?pagesize=" + $scope.pagesize + "&pageno=" + $scope.pageno;
		//	var url = "/vconsole/group/list?pagesize="+$scope.pagesize+"&pageno="+$scope.pageno;
		$http({
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*'
			},
			url: url
		}).then(function successCallback(response) {
			document.getElementById("loading").style.display = "none";
			if(response.data.issucess == "1") {
				if(response.data.data.rows.length > 0) {
					$scope.groupList = response.data.data.rows;
				} else {
					$scope.groupList = {};
					//					$scope.gethistoryNext=false;
					alert("当前也没有更多数据了")
				}

			}

			console.log(JSON.stringify($scope.groupList));

		}, function errorCallback(response) {
			document.getElementById("loading").style.display = "none";
			// 请求失败执行代码
			alert("errorCallback=" + JSON.stringify(response.data));
		});
		//		$("#qrModal").modal("hide");
	}

	$scope.getGroupList();

	//2.获取组list下一页
	$scope.gethistoryNext = function() {
		$scope.pageno = $scope.pageno + 1;
		$scope.getGroupList();

	}
	//4.获取list上一页
	$scope.gethistoryBack = function() {
		$scope.pageno = $scope.pageno - 1;
		$scope.getGroupList();
	}

	//获取项目list
	$scope.getAppList = function(groupid) {

		document.getElementById("loading").style.display = "block";
		var url = "group/list?pagesize=" + $scope.pagesize + "&pageno=" + $scope.pageno;
		$http({
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*'
			},
			url: url
		}).then(function successCallback(response) {
			document.getElementById("loading").style.display = "none";
			if(response.data.issucess == "1") {
				if(response.data.count != "0") {
					$scope.detailList = response.data.data.rows;
					alert(JSON.stringify(response.data.data.rows))
				} else {

				}
			}

		}, function errorCallback(response) {
			document.getElementById("loading").style.display = "none";
			// 请求失败执行代码
			$scope.$emit("NOTBUSY");
			alert("errorCallback=" + JSON.stringify(response.data.msg));
		});
	}

	//获取项目类别 select
	$scope.getSelectXmlb = function() {

		document.getElementById("loading").style.display = "block";
		var url = "/api/project/type";
		$http({
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*'
			},
			url: url
		}).then(function successCallback(response) {
			document.getElementById("loading").style.display = "none";
			if(response.data.issucess == "1") {
				$scope.ptypeLists = response.data.data;
			}

		}, function errorCallback(response) {
			document.getElementById("loading").style.display = "none";
			// 请求失败执行代码
			$scope.$emit("NOTBUSY");
			alert("errorCallback=" + JSON.stringify(response.data.msg));
		});
	}

	//		$scope.getAppList();

	//添加项目弹框  
	$scope.btnAddApp = function() {
		$scope.btnSaveType = "add";
		$scope.appParentInfo = {};
		$scope.firstPageShow = true;
//		$scope.openAddModal($scope.ptypeLists);
		$scope.getSelectXmlb();
		//		$scope.$apply();
	}
	$scope.btnAddGroup = function() {
		$scope.groupInfo = {};
		//		$scope.$apply();
	}

	//删除group
	//	$scope.btnDelGroupInfo = function(i) {
	//		$scope.groupList.splice(i, 1);
	//		localStorage.setItem("groupList", angular.toJson($scope.groupList));
	//		$scope.$apply();
	//	}
	/*************************************************************************************************/
	//添加group  wjs
	$scope.btnSaveGroupInfo = function() {
		if($scope.groupInfo.gname != "" && $scope.groupInfo.gname != null && $scope.groupInfo.gdes != "" && $scope.groupInfo.gdes != null) {

			var url = "/api/group/add";
			//			var url="/vconsole/group/add";
			document.getElementById("loading").style.display = "block";
			$http({
				method: 'POST',
				data: $scope.groupInfo,
				headers: {
					'Access-Control-Allow-Origin': '*'
				},
				url: url
			}).then(function successCallback(response) {
				document.getElementById("loading").style.display = "none";
				alert("添加成功！");
				$scope.getGroupList();
			}, function errorCallback(response) {
				document.getElementById("loading").style.display = "none";
				// 请求失败执行代码
				alert("errorCallback=" + JSON.stringify(response.data));
			});

			$scope.groupInfo = {};
		} else {
			alert("请填写Group名称、域名！");
		}
		$scope.$apply();
	}

	//重置group
	$scope.btnResetGroupInfo = function() {
		$scope.groupInfo = {};
		$scope.$apply();
	}

	//删除group
	$scope.btnDelAppParentInfo = function(app, index) {
		if(confirm("你确定删除 " + app.group + " 吗？")) {

			var url = "/testreq/appinfo/delgroup?groupid=" + app.groupid;
			document.getElementById("loading").style.display = "block";
			$http({
				method: 'POST',
				//				data: $scope.appParentInfo,
				headers: {
					'Access-Control-Allow-Origin': '*'
				},
				url: url
			}).then(function successCallback(response) {
				document.getElementById("loading").style.display = "none";
				alert("删除成功！");
				$scope.getGroupList();
				$scope.$apply();
			}, function errorCallback(response) {
				document.getElementById("loading").style.display = "none";
				// 请求失败执行代码
				alert("errorCallback=" + JSON.stringify(response.data));
			});

		} else {
			//			alert("点击了取消");
		}

	}

	//编辑group
	$scope.btnEditAppParentInfo = function(app, index) {
		$scope.btnSaveType = "edit";
	}

	/*************************************************************************************************/
	//添加项目  wjs 20180928

	// 下一步
	$scope.btnNextAppParent = function() {

		if(!$scope.appParentInfo.pname) {
			alert("请输入项目名");
		} else if(!$scope.appParentInfo.pdes) {
			alert("请输入描述");
		} else if(!$scope.appParentInfo.ptype && $scope.appParentInfo.ptype != 0) {
			alert("请选择类型")
		} else {
			var params = {};
			params.pname = $scope.appParentInfo.pname;
			params.pdes = $scope.appParentInfo.pdes;
			params.type = $scope.appParentInfo.ptype;
			var url = "/api/config/project";
//			var url = "json/j1.json";
			document.getElementById("loading").style.display = "block";
			$http({
				method: 'GET',
				params: params,
				headers: {
					'Access-Control-Allow-Origin': '*'
				},
				url: url
			}).then(function successCallback(response) {
				document.getElementById("loading").style.display = "none";
				console.log(response.data)
				var data = response.data;
				if(data.issucess == "1") {
					var gitGroupList = JSON.parse(data.data);
					$scope.gitGroupList = gitGroupList;
					console.log($scope.gitGroupList)
					$scope.firstPageShow = false;
					$scope.data.pro = getGroupList($scope.gitGroupList);
					if($scope.appParentInfo.pname != null && $scope.appParentInfo.pdes != null && $scope.appParentInfo.ptype != null ) {
						$scope.openModal($scope.gitGroupList,$scope.data.pro,$scope.appParentInfo);
					} else {
						alert("请填写完整项目信息！");
					}
					console.log($scope.data.pro)
				}

			}, function errorCallback(response) {
				document.getElementById("loading").style.display = "none";
				// 请求失败执行代码
				alert("errorCallback=" + JSON.stringify(response.data));
			});
		}

	}
	$scope.openModal = function(items,pro,detail) {
		$('body').on("touchmove", function(e) {
			e.preventDefault();
		}, false);

		var modalInstance = $modal.open({
			templateUrl: 'view/demo6.html', //script标签中定义的id
			controller: 'demo6', //modal对应的Controller
			resolve: {
				data: function() { //data作为modal的controller传入的参数
					data = {
						data: items,
						pro: pro,
						detail: detail,
//						token: token
					};
					return data; //用于传递数据
				}
			}
		});
		modalInstance.result.then(function(result) {
			console.log(result)
			if(!isEmptyObject(result)){
				$scope.data.pro = result;
				$scope.btnSaveAppParent();
			}
			$scope.fiveSheetShow = false;
		}, function(reason) {
			console.log(reason); // 点击空白区域，总会输出backdrop
			// click，点击取消，则会暑促cancel
			// $log.info('Modal dismissed at: ' + new Date());
		});
	}
	$scope.openAddModal = function(items) {
		$('body').on("touchmove", function(e) {
			e.preventDefault();
		}, false);

		var modalInstance = $modal.open({
			templateUrl: 'view/demo6.html', //script标签中定义的id
			controller: 'demo6', //modal对应的Controller
			resolve: {
				data: function() { //data作为modal的controller传入的参数
					data = {
						data: items,
//						token: token
					};
					return data; //用于传递数据
				}
			}
		});
		modalInstance.result.then(function(result) {
			console.log(result)

		}, function(reason) {
			console.log(reason); // 点击空白区域，总会输出backdrop
			// click，点击取消，则会暑促cancel
			// $log.info('Modal dismissed at: ' + new Date());
		});
	}
	// 保存
	$scope.btnSaveAppParent = function() {
		// 判断是否有修改的值，进行替换
		$scope.data.pname = $scope.appParentInfo.pname;
		$scope.data.pdes = $scope.appParentInfo.pdes;
		$scope.data.ptype = $scope.appParentInfo.ptype;
		$scope.data.gid = $scope.app.gid;
		console.log("增加项目入参：" + JSON.stringify($scope.data));
		var url = "/api/project/add";
		document.getElementById("loading").style.display = "block";
		$http({
			method: 'POST',
			data: $scope.data,
			headers: {
				'Access-Control-Allow-Origin': '*'
			},
			url: url
		}).then(function successCallback(response) {
			console.log(response)
			document.getElementById("loading").style.display = "none";
			alert("添加项目成功！");
			$scope.btnAppDetailInfo($scope.app, $scope.checked);
			$scope.data = {};
			$(".modal-backdrop").removeClass("in");
	    	$("#modal-container-267843").removeClass("in");
			$scope.fiveSheetShow = false;
			//				$scope.$apply();
		}, function errorCallback(response) {
			document.getElementById("loading").style.display = "none";
			// 请求失败执行代码
			alert("errorCallback=" + JSON.stringify(response.data));
		});
	}

	//查看项目 信息 20180927
	$scope.btnAppDetailInfo = function(app, index) {
		console.log(app)
		$scope.app = app;
		console.log(index)
		$scope.detailList = [];
		$scope.checked = index;

		var url = "/api/project/list?gid=" + app.gid;
		//		var url = "/vconsole/project/list?gid=" + app.gid;

		if($scope.back == true) { // $scope.back == true
			$scope.back = false;
			//		$scope["back"+index] =false;
		} else {
			$scope.back = true;
			//			$scope["back"+index] =true;
			document.getElementById("loading").style.display = "block";
			$http({
				method: 'GET',
				headers: {
					'Access-Control-Allow-Origin': '*'
				},
				url: url
			}).then(function successCallback(response) {
				console.log(response.data)
				document.getElementById("loading").style.display = "none";

				if(response.data.issucess == "1") {
					if(response.data.data.count != "0") {
						$scope.detailList = response.data.data.rows;
						console.log("项目列表结果集：" + JSON.stringify($scope.detailList));

					} else {
						alert("抱歉，未查询到对应组的项目列表");
					}
				} else {
					alert("抱歉，未查询到对应组的项目列表");
				}

			}, function errorCallback(response) {
				document.getElementById("loading").style.display = "none";
				// 请求失败执行代码
				alert("errorCallback=" + JSON.stringify(response.data.msg));
			});
		}

		//		$scope.detailList = [
		//			[{
		//				"appid": "b5fad4508dbe499c966635519d2a8198",
		//				"os": "a",
		//				"pkgid": "com.neusoft.ihrss.jiangsu.changzhourenshe",
		//				"app": "czrs",
		//				"name": "changzhourenshe",
		//				"cname": "常州人社",
		//				"ti": "2017-10-02 13:56:00"
		//			}, {
		//				"appid": "a4873f6ce88445508fd53bfce7935908",
		//				"os": "i",
		//				"pkgid": "com.neusoft.ihrss.jiangsu.changzhourenshe",
		//				"app": "czrs",
		//				"name": "changzhourenshe",
		//				"cname": "常州人社",
		//				"ti": "2017-12-22 19:17:17"
		//			}]
		//		];
	}

	//更新app信息
	$scope.btnUpdateAppInfo = function(detail, appInfo) {
		var app = JSON.stringify(detail);
		localStorage.setItem("groupid", appInfo.groupid);
		localStorage.setItem("detail", app);
		window.location.href = "upData.html";
	}

	//删除App
	$scope.btnDelAppInfo = function(detail, app) {
		var verlisturl = "/testreq/appinfo/verlist?groupid=" + app.groupid + "&appid=" + detail.appid;
		var verlist = [];
		document.getElementById("loading").style.display = "block";
		$http({
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*'
			},
			url: verlisturl
		}).then(function successCallback(response) {
			document.getElementById("loading").style.display = "none";
			verlist = response.data.data;

			if(verlist.length > 0) {
				alert("此App中有更新版本，请先删除版本再删除App！");
			} else {
				document.getElementById("loading").style.display = "block";
				var url = "/testreq/appinfo/delapp?groupid=" + app.groupid + "&appid=" + detail.appid;
				$http({
					method: 'POST',
					headers: {
						'Access-Control-Allow-Origin': '*'
					},
					url: url
				}).then(function successCallback(response) {
					document.getElementById("loading").style.display = "none";
					alert("删除" + detail.cname + "成功！");
					$scope.getAppList(app.groupid);
					$scope.$apply();
				}, function errorCallback(response) {
					document.getElementById("loading").style.display = "none";
					// 请求失败执行代码
					//			alert("errorCallback=" + JSON.stringify(response.data));
				});
			}
		}, function errorCallback(response) {
			document.getElementById("loading").style.display = "none";
			// 请求失败执行代码
			alert("errorCallback=" + JSON.stringify(response.data));
		});

		$scope.$apply();
	}
	//$("#loading").modal("show");
	/*************************************************************************************************/

	// 打包按钮--打包页面
	$scope.btnPackageApp = function(detail) {
		console.log("项目详情" + JSON.stringify(detail));
		$scope.appParentInfo = detail;
		$scope.btnNextAppParent();
//		$scope.openModal({},{},detail);
//		localStorage.setItem("pdetail", JSON.stringify(detail));
//		location.href = "./view/package.html";

	}
	//打包历史
	$scope.btnAddAppHistory = function(detail) {
		console.log("项目详情2" + JSON.stringify(detail));
		localStorage.setItem("historypdetail", JSON.stringify(detail));
		location.href = "./view/packhistory.html"
	}

	$scope.close = function () {
        var data = {};
    	$(".modal-backdrop").removeClass("in");
    	$(".made").removeClass("in");
		$scope.fiveSheetShow = false;
        $modalInstance.close(data);
   }
	
});
