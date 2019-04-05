app.controller("demo6", function($scope, $http ,$modalInstance, data,$rootScope, $modal) {

	$scope.conf = {};
	window.document.ontouchend = function () {
        $('body').off("touchmove");
    }
	$scope.gitGroupList = data.data || {};
	$scope.pro = data.pro || {};
	$scope.detail = data.detail || {};
	$scope.pro.pid = $scope.detail.pid || "";
	console.log($scope.gitGroupList)
	console.log($scope.pro)
	console.log($scope.detail)
	if(isEmpty($scope.pro.pid)){  // 打版
		$scope.dabaoBtnShow = true;
		$scope.baochunBtnShow = false;
	} else {  // 保存
		$scope.dabaoBtnShow = false;
		$scope.baochunBtnShow = true;
	}
	
	// 关闭弹出框
	$scope.close = function () {
		var data = {};
        $modalInstance.close(data);
        $scope.fiveSheetShow = false;
    }
	// 图片上传点击事件
	$scope.fileClick = function(item){
		console.log(item)
		if(!isEmpty(item.subInfo.checkFormat)){  // 没有图片或文件格式校验
			
		}
		$("#"+item.name)[0].addEventListener('change', function(e) {
			var files = this.files;
			if(files.length) {
				// 文件流
				$scope[($(this)[0].id)+'files'] = files[0];
				console.log($scope[($(this)[0].id)+'files']);
				console.log(files[0].type);
				console.log(this.width)
//				if(/image\/\w+/.test(files[0].type)) {
					// 图片文件流
					$scope.checkFile(this,item);
//				}
				$scope.$apply();
			}
		});
	}
	
	// 页面图片文件显示
	$scope.checkFile = function(filesHtml,item) {
		console.log(item)
		var file = filesHtml.files[0];
		var reader = new FileReader();
		// onload是异步操作
		reader.onload = function(e) {
			var newDataURL = e.target.result; // 带前缀的base64,自己放到页面 src 里显示用
			$(filesHtml).parent().children().remove("img");
			var imgHtml = '<img src="' + newDataURL + '" alt="img" style="width:100px;height:100px">';
			$(filesHtml).before(imgHtml);
		}
		reader.readAsDataURL(file);
	}
	
	// 文件流格式保存
	$scope.filesSave = function(name,type) {
		
		console.log($scope[name+'files'])
		console.log(type)
		var namefiles = $scope[name+'files'];
		var fd = new FormData();
		fd.append("file",namefiles);
		console.log(fd);
        if(type == "image"){
			var url="/resource/image?key="+name;
		} else if(type =="file"){
			var url="/resource/file?key="+name;
		}
//      var url="json/file.json";
		$http({
			method:"POST",
			headers: {
				"Content-Type": undefined,
				"Access-Control-Allow-Origin": '*'
			},
			data:fd,
			url:url,
			transformRequest: angular.identity,
		}).then(function successCallback(response){
			if(response.data.issucess=="1"){
				$scope.conf[name]=response.data.data.fileid;
				console.log("文件描述pid:"+$scope.conf[name]);
				console.log("描述文件上传成功，撒花*★,°*:.☆(￣▽￣)/$:*.°★* 。");
			}
			
		}),function errorCallback(response){
			alert("描述文件上传失败");
		}
	}
	
	// type 是checkbox时，选中不选中进行切换
	$scope.checkboxChange = function(gitGroupList){
		console.log(gitGroupList)
		$scope.pro = getGroupList(gitGroupList);
	}
	
	$scope.subPageClick = function(item){
		console.log(item)
		$('body').on("touchmove", function(e) {
			e.preventDefault();
		}, false);

		var modalInstance = $modal.open({
			templateUrl: 'demo6.html', //script标签中定义的id
			controller: 'demo6', //modal对应的Controller
			resolve: {
				data: function() { //data作为modal的controller传入的参数
					data = {
						data: item.subInfo.groups,
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
	
	// 保存，值带回index.js
	$scope.btnSaveAppParent = function(){
		// 判断是否有修改的值，进行替换
		$scope.pro = updProConf($scope.conf,$scope.pro);
		console.log($scope.pro)
		$modalInstance.close($scope.pro);
		$scope.fiveSheetShow = false;
	}
	
	//打包 操作
	$scope.btnDabaso=function(){
		$scope.pro = updProConf($scope.conf,$scope.pro);
		console.log($scope.pro)
		var url="/api/project/pack";
		document.getElementById("loading").style.display = "block";
		$http({
			method: 'post',
			headers: {
					'Access-Control-Allow-Origin': '*'
				},
			data:$scope.pro,
			url: url
		}).then(function successCallback(response) {
			console.log(response)
			document.getElementById("loading").style.display = "none";
			if(response.data.issucess =="1") {
				$modalInstance.close({});
				alert("打包成功！！撒花*★,°*:.☆(￣▽￣)/$:*.°★* 。");
//				window.location.href = "../index.html";
			}

		}, function errorCallback(response) {
			document.getElementById("loading").style.display = "none";
			// 请求失败执行代码
			alert("errorCallback=" + JSON.stringify(response.data.msg));
		});
	
	}
});
