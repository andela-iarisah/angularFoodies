(function(){
	var app = angular.module('foodiesApp', []);
	app.controller('foodiesController', ['$scope', '$http', function($scope, $http){
			$scope.header = true;
			$scope.unavailable = false;
			$scope.incorrect = false;
			$scope.hideIngredients = true;
			$scope.leavePresent = true;
			$scope.rcpName = false;
			$scope.onclick = true;
		
		$scope.imageProcess = function(imgUrl) {
			if (imgUrl && imgUrl[90]) {
				return imgUrl[90];
			}
			return 'images/unavailable.jpg'
		}

		$scope.showIngredients = function() {
			this.hideIngredients = false;
			this.rcpName = false;
			this.leavePresent = false;
			this.onclick = false;
		}

		$scope.HideIngredients = function() {
			this.rcpName = false;
			this.hideIngredients = true;
			this.leavePresent = true;
			this.onclick = true;
		}

		$scope.getSearch = function() {
			$scope.foodItems = [];
			$scope.numItems = "";
			$scope.load = true;
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
					
				if (!isNaN($scope.typeIn)) {
				 	$scope.header = false;
				 	$scope.incorrect = true;
				 	$scope.load = false;
				 	$scope.numItems = false;
				 	return false;
				}
				
				$http(config).success(function(response) {
					$scope.foodItems = response;
					$scope.result = $scope.foodItems.matches;
					
					if ($scope.result.length < 1) {
						$scope.header = false;
						$scope.numItems = false;
						$scope.unavailable = true;
						$scope.load = false;
					}	
					else {
						$scope.header = true;
						$scope.numItems = true;
						$scope.load = false;
					}
				});
				$scope.typeIn = "";
				
		};
	}]);
})();