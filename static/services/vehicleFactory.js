/**
* Vehicle Factory holds all the functionality that is necessary to get the updated locations of the vehicle,
* to draw and plot the vehicle on the map, to get the shape of the vehicle
* Name of the factory: vehicleFactory
* Name of the module: sfmuniApp
*/
angular.module("sfmuniApp")
    
    .factory("vehicleFactory", ["$http", "$q", "responseType", "agency", function($http, $q, responseType, agency) {
        let nextbusURL = "http://webservices.nextbus.com/service/" + responseType + "?a=" + agency + "&";

        let getVehiclePositions = function(route){
            let deferred = $q.defer();
            $http({
                method: "GET",
                url: nextbusURL + "command=vehicleLocations&t=0&r=" + route
            })
            .then(function successCallback(response) {
                let locationList = [];
                if (undefined !== response.data.vehicle) {
                    let vehicles = response.data.vehicle;                    
                    if (!Array.isArray(vehicles) && vehicles.heading > 0) {
                        locationList.push(vehicles);
                    }
                    else{
                        vehicles.forEach(function(vehicle){
                            if(vehicles.heading < 0){
                                //do nothing
                            }
                            else if (vehicle.heading > 0) {
                                locationList.push(vehicle);
                            }
                        });
                    }
                }
                deferred.resolve(locationList);
            }, function errorCallback(response) {
                deferred.reject(new Array());
            });

            return deferred.promise;
        };

        let getVehicleBody = function(x,y){
          var height = 8;
              var width = 6;
              return 'm ' + x + ' ' + (y - height / 2) +
                  ' l ' + (width / 2) + ' ' + height + 
                  ' h ' + -width + ' z ';
        };

        let getVehicleRotation = function(angle, x, y) {
              return 'rotate(' + angle + ' ' + x + ' ' + y + ')';
        };

        let drawVehicle = function(x,y,vehicle,color,g){
          let buses = g.select("#buses")
          buses
            .append("path")
            .attr("d", getVehicleBody(x,y))
            .attr("id", vehicle.id)
            .attr("class","route-"+vehicle.routeTag)
            .attr("name", "vehicles")
            .attr("fill", color)
            .style('stroke', 'black')
            .attr("transform", getVehicleRotation(vehicle.heading,x,y));
        };

        let plotVehicle = function(x,y,vehicle,color,g){
            drawVehicle(x,y,vehicle,color,g);
        };
        
        return {
            getVehiclePositions: getVehiclePositions,
            drawVehicle : drawVehicle,
            getVehicleBody : getVehicleBody,
            getVehicleRotation : getVehicleRotation,
            plotVehicle : plotVehicle
        };
    }]);