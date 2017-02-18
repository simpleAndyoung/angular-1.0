// 获取程序的代码
angular.module("myApp",['ui.router'])
// 配置路由
.config(function ($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('home',{
		url:'/home',
		templateUrl:'view/home.html',
		controller:'homeCtrl'
	})
	// 登录页
	.state('login',{
		url:'/login',
		templateUrl:'view/login.html',
		controller:'loginCtrl'
	})
	// 用户模块列表页
	.state('userlist',{
		url:'/userlist/:pageNum',
		templateUrl:'view/user/list.html',
		controller:'userListCtrl'
	})
	// 用户详情页
	.state('userdetail',{
		url:'/userdetail/:userId',
		templateUrl:'view/user/detail.html',
		controller:'userDetailCtrl'
	})
	// 创建用户页
	.state('usercreate',{
		url:'/usercreate',
		templateUrl:'view/user/create.html',
		controller:'userCreateCtrl'
	})
	// 新闻模块路由  列表页 详情页 创建页
	.state('newslist',{
		url:'/newslist/:pageNum',
		templateUrl:'view/news/list.html',
		controller:'newsListCtrl'
	})
	.state('newsDetail',{
		url:'/newsdetail/:newsId',
		templateUrl:'view/news/detail.html',
		controller:'newsDetailCtrl'
	})
	.state('newsCreate',{
		url:'/newscreate',
		templateUrl:'view/news/create.html',
		controller:'newsCreateCtrl'
	})
	// 定义默认路由 =>首页
	$urlRouterProvider
		.otherwise('/home')
})
// home页的内容
.controller('homeCtrl',function ($scope,$interval){
	$scope.date = new Date();
	// 用interval服务
	$interval(function (){
		$scope.date = new Date();
	})
})
// 列表页控制器
.controller('userListCtrl',function ($scope,$http,$stateParams){
	$scope.num = $stateParams.pageNum;
	$http
	.get('action/userlist.php?pageNum='+$scope.num)
	.success(function (res){
		console.log(res)
		if(res && res.errno === 0){
			$scope.list = res.data;
		}
	})
})
// 用户详情页
.controller('userDetailCtrl',function ($scope,$http,$stateParams){
	$http
	.post('action/userdetail.php?userId='+$stateParams.userId)
	.success(function(res){
		if(res && res.errno === 0){
			$scope.user = res.data;
		}
	})
})
// 用户创建页
.controller('userCreateCtrl',function ($scope,$http,$location){
	$scope.submitUser=function(){
		console.log($scope.user)
		$http
		.post('action/createuser.php',$scope.user)
		.success(function (res){
			console.log(res)
			if(res && res.errno===0){
				$location.path('/userlist/1')
			}else {
				alert('提交失败了，请重新提交')
			}
		})
	}
})
// 新闻页
// 新闻列表
.controller('newsListCtrl', function ($scope, $http, $stateParams) {
	// checkLogin.check();
	// 请求数据渲染页面
	$scope.num = $stateParams.pageNum;
	// 根据页码请求数据
	$http
		.get('action/newslist.php?pageNum=' + $scope.num)
		// 监听回调
		.success(function (res) {
			// 如果请求成功
			if (res && res.errno === 0) {
				// 将数据存储
				$scope.list = res.data;
			}
		})

})
// 新闻详情
.controller('newsDetailCtrl', function ($scope, $http, $stateParams) {
	// checkLogin.check();
	// 获取新闻id
	var id = $stateParams.newsId;
	// 请求数据
	$http
		.get('action/newsdetail.php?newsId=' + id)
		// 监听回调
		.success(function (res) {
			// 如果数据返回成功，我们存储数据
			if (res && res.errno === 0) {
				// 将data保存news变量中
				$scope.news = res.data;
			}
		})
})
// 创建新闻
.controller('newsCreateCtrl', function ($scope, $http, $location) {
	// 检测登录
	// checkLogin.check();
	// 定义提交事件
	$scope.submitNews = function () {
		// 适配时间
		$scope.newsData.date = new Date().getTime();
		// console.log($scope.newsData)
		// 发送数据
		$http
			.post('action/createnews.php', $scope.newsData)
			// 监听回调函数
			.success(function (res) {
				// 如果返回成功，我们进入新闻列表页，
				if (res && res.errno === 0) {
					$location.path('/newslist/1')
				}
			})
	}
})
// login控制器
.controller('loginCtrl',function ($scope,$http,$location){
	$scope.goToLogin = function (){
		$http
		.post('action/login.php',$scope.user)
		.success(function (res){
			if(res && res.errno === 0 && res.data){
				$scope.userName = res.data.username;
				$location.path('/home')
			}
		})
	}
})
// 定义头部控制器
.controller('headerCtrl',function ($scope,$http,$location,$rootScope){
	$http.get('action/checkLogin.php')
	.success(function (res){
		if(res && res.errno === 0 && !res.data){
			$location.path('/login')
		}else if(res && res.errno == 0 && res.data){
			$rootScope.userName = res.data.username;
		}
	})
})
// 创建导航控制器
.controller('navCtrl',function ($scope){
	$scope.list = [
		// 用户模块
		{
			// 定义模块名称
			title: '用户模块',
			// 定义子模块
			childList: [
				{
					subTitle: '用户列表',		// 表示子模块title
					link: '#/userlist/1'		// 子模块链接
				},
				{
					subTitle: '创建用户',
					link: '#/usercreate'
				}
			]
		},
		// 新闻模块
		{
			title: '新闻模块',
			childList: [
				{
					subTitle: '新闻列表',
					link: '#/newslist/1'
				},
				{
					subTitle: '创建新闻',
					link: '#/newscreate'
				}
			]
		}
	]
})