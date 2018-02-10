/**
* Path Factory holds all the functionality that is necessary to obtain list of routes for given route tag,
* draw the path for a route tag by plotting points and creating a Line String
* Name of the factory: pathFactory
* Name of the module: sfmuniApp
*/
angular.module("sfmuniApp")
    
    .factory("pathFactory", ["$http", "$q", "responseType", "agency", function($http, $q, responseType, agency) {
        let nextbusURL = "http://webservices.nextbus.com/service/" + responseType + "?a=" + agency + "&";

        let getPath = function(route){
            let deferred = $q.defer();
            $http({
                method: "GET",
                url: nextbusURL + "command=routeConfig&r=" + route
            })
            .then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.reject(new Array());
            });
            return deferred.promise;
        }

        let getPathPoints = function(paths){
            let linePath = [];
            for(let i = 0; i < paths.length; i++){
                let arr = paths[i].point;
                let coord = [];
                for(let j = 0; j < arr.length; j++){
                    let lon = +arr[j].lon;
                    let lat = +arr[j].lat;
                    let z = 0;
                    coord.push([lon,lat,z]);
                }
                let result = {type : "Feature",
                              geometry : {type : "LineString",
                              coordinates : coord}};
                linePath.push(result);
            }
            return linePath;
        }

        let drawPath = function(tag,linePath,routeColor,path){
            let route = d3.select("#routes");               
            route.append("g")
               .attr("class", "route-"+tag)
               .selectAll("path")
               .data(linePath)
               .enter()
               .append("path")
               .attr("fill", "rgba(1,1,1,0)")
               .attr("stroke-width", "1px")
               .attr("stroke", routeColor)
               .attr("z-index", 10)
               .attr("d", path);
        }

        return {
            getPath: getPath,
            getPathPoints : getPathPoints,
            drawPath : drawPath
        };
    }]);