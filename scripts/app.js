(function(){
	var app = angular.module('foodiesApp', []);
	app.controller('foodiesController', ['$scope', '$http', function($scope, $http){
			$scope.foodItems = [];
		$scope.getSearch = function() {
			console.log($scope.typeIn);
			var config = {
				method: "jsonp",
				url: "http://api.yummly.com/v1/api/recipes",
				params: {
					_app_key: "87f181456268c338b0edf7bdb5006a77",
		 			_app_id: "5e4de867",
			 		q: $scope.typeIn,
			 		callback: "JSON_CALLBACK"
				}
			};

				$http(config).success(function(response) {
					console.log(response);
					$scope.foodItems = response;
					$scope.result = $scope.foodItems.matches;
				});
				$scope.typeIn = "";
			};
	}]);
})();