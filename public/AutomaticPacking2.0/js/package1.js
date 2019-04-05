var app = angular.module("IndexApp", ['ui.bootstrap']);
app.controller("IndexCtrl", function($scope, $http, $rootScope, $modal) {
	$scope.btnSaveType = "add";
	$scope.conf = {};
	$scope.pdetail=JSON.parse(localStorage.getItem("pdetail"));
	// 获取打版文件
	$scope.dabanWj=function(){
	
		var url="/api/config/pack?pid="+$scope.pdetail.pid;
		document.getElementById("loading").style.display = "block";
		$http({
			method: 'get',
			headers: {
					'Access-Control-Allow-Origin': '*'
				},
			url: url
		}).then(function successCallback(response) {
			console.log(response.data)
			document.getElementById("loading").style.display = "none";
			if(response.data.issucess =="1") {
				$scope.gitGroupList = JSON.parse(response.data.data)
				console.log($scope.gitGroupList)
				$scope.pro = getGroupList($scope.gitGroupList);
				console.log($scope.pro)
			}

		}, function errorCallback(response) {
			document.getElementById("loading").style.display = "none";
			// 请求失败执行代码
			alert("errorCallback=" + JSON.stringify(response.data.msg));
		});
	
	}
	$scope.dabanWj();
	
	//打包 操作
	$scope.btnDabaso=function(){
		$scope.pro = updProConf($scope.conf,$scope.pro);
		var url="/api/project/pack";
		$scope.pro.pid=$scope.pdetail.pid;
		console.log($scope.pro)
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
				
				alert("打包成功！！撒花*★,°*:.☆(￣▽￣)/$:*.°★* 。");
				window.location.href = "../index.html";
			}

		}, function errorCallback(response) {
			document.getElementById("loading").style.display = "none";
			// 请求失败执行代码
			alert("errorCallback=" + JSON.stringify(response.data.msg));
		});
	
	}
	
	// 图片上传点击事件
	$scope.fileClick = function(item){
		console.log(item)
		$("#"+item.name)[0].addEventListener('change', function(e) {
			var files = this.files;
			if(files.length) {
				// 文件流
				$scope[($(this)[0].id)+'files'] = files[0];
				console.log($scope[($(this)[0].id)+'files']);
				if(/image\/\w+/.test(files[0].type)) {
					// 图片文件流
					$scope.checkFile(this,item);
				}
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
			var imgHtml = '<img src="' + newDataURL + '" alt="img" width="'+item.subInfo.sizeWidth+'" height="'+item.subInfo.sizeHeight+'">';
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
	$scope.checkboxChange = function(check){
		console.log(check)
		for(i = 0; i < $scope.items.length; i++) {
			for(j = 0; j < $scope.items[i].groupInfo.length; j++) {
				var na = $scope.items[i].groupInfo[j].name;
				if($scope.items[i].groupInfo[j].type=='checkbox'){
					// check多选
					if(check){
						for(c = 0;c<$scope.items[i].groupInfo[j].subInfo.info.length;c++){
							checkMap.put($scope.items[i].groupInfo[j].subInfo.info[c].name,$scope.items[i].groupInfo[j].subInfo.info[c].subInfo.showValue);
							$scope.data[na] = checkMap.data;
						}
					} else {
						for(c = 0;c<$scope.items[i].groupInfo[j].subInfo.info.length;c++){
							$scope.data[na] = {};
						}
					}
					
				}
				
			}
		}
	}
	// type是subpage的时候
	$scope.subPageClick = function(item){
		console.log(item)
		localStorage.setItem("subPageItem",JSON.stringify(item))
		window.location.href = "subpackage.html";
	}
	
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
        	$(".modal-backdrop").hide();

        }, function (reason) {
            console.log(reason); // 点击空白区域，总会输出backdrop
            // click，点击取消，则会暑促cancel
            // $log.info('Modal dismissed at: ' + new Date());
        });
    }
});