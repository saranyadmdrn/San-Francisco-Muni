/**
* Route Factory holds all the functionality that is necessary to obtain the list of routes for a given agency
* Name of the factory: routeFactory
* Name of the module: sfmuniApp
*/
angular.module("sfmuniApp")
	.factory("routeFactory",["$http", "$q", "responseType", "agency", function($http, $q, responseType, agency) {
        let nextbusURL = "http://webservices.nextbus.com/service/" + responseType + "?a=" + agency + "&";

		let getRouteLists = function(){
            let deferred = $q.defer();
            $http({
                method: "GET",
                url: nextbusURL + "command=routeConfig"
            })
            .then(function successCallback(response) {
                if (response.data.route.length > 0) {
                    deferred.resolve(response.data.route);
                } 
                else {
                    deferred.reject(new Array());
                }
            }, function errorCallback(response) {
                deferred.reject(new Array());
            });
            return deferred.promise;
        }

		return{
			getRouteLists : getRouteLists
		};

	}]);