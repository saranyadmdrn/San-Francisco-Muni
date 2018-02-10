/**
* Controller that accesses the services to fulfil the business requirements.
* Name of the controller : MainController
* Name of the module : sfmuniApp
*/
angular.module("sfmuniApp").controller("MainController",["$scope","$interval","$window","mapFactory","mapsToLoad","routeFactory","pathFactory","vehicleFactory",
	function($scope,$interval,$window,mapFactory,mapsToLoad,routeFactory,pathFactory,vehicleFactory){
		$scope.showApp = false;
		let selectedRouteList = [], 
			currentTag,
			palette = [],
			bounds,
			scale,
			translate,
			g;
		
		let map = {
			width : mapFactory.width,
			height : mapFactory.height,
			drewNeighhbor : false,
			projection : mapFactory.getProjection(),
			svg : mapFactory.getSvg()
		};

		let path = d3.geoPath().projection(map.projection),
			transform = d3.zoomIdentity,
			svg = map.svg,
			zoom = d3.zoom()
					.scaleExtent([0.8,8])
					.on("zoom", zoomed);

		g = svg.append("g")
			.call(zoom);

		/**
		*defining layers
		*/ 
		g.append("g").attr("id", "neighborhoods");
    	g.append("g").attr("id", "streets");
    	g.append("g").attr("id", "texts");
    	g.append("g").attr("id","routes");
		g.append("g").attr("id","buses");

		let queue = d3.queue();
	
		/**
		*maps to be drawn
		*/
		mapsToLoad.forEach(function(mapToLoad){
			queue.defer(d3.json,mapToLoad,drawMap);
		});
		queue.awaitAll(function(error){
			if(error){
				$scope.message = "Error "+ error;
				throw error;
			}
			else{
				$scope.message = "maps loaded successfully";
			}
		});

		/**
		*zoom on the map by scrolling up and down
		*/
		function zoomed(){
			svg.attr("transform", d3.event.transform);
		};

		/**
		*neighborhoods is drawn first and then streets drawn on top of neighborhood
		*/
		function drawMap(json){
			if(undefined === bounds){
				calculateBounds(json);
			}
			if(!map.drewNeighhbor){
				mapFactory.drawNeighborhoods(json,path);
				map.drewNeighhbor = true;
			}
			if(map.drewNeighhbor){
				mapFactory.drawStreets(json,path);
				$scope.showApp = true;
			}
		};

		function calculateBounds(json){
			bounds = path.bounds(json),
			scale = 0.95 / Math.max((bounds[1][0] - bounds[0][0]) / map.width ,(bounds[1][1] - bounds[0][1]) /map.height),
			translate = [(map.width - scale * (bounds[1][0] + bounds[0][0])) / 2,
						 (map.height - scale * (bounds[1][1] + bounds[0][1])) /2];

			map.projection.scale(scale).translate(translate);
		};

		/**
		* Fetches the list of routes
 		*/
  		function getRouteLists(){
			routeFactory.getRouteLists().then(function(routes){
				$scope.routes = routes;
			}, function(error){
				$scope.message = "Error occured while fetching routes";
			})
		};

		/**
		*fetches the path for each tag
		*fetches the real time locations of the vehicles
 		* @param {obj} data - List of routes.
 		*/
		$scope.getVehiclePathAndPosition = function(data){
			let routeChecked = data.routeChecked;
			let routeTag = data.route.tag;
			let selected = []
			if(routeChecked){
				selectedRouteList.push(routeTag);
				selected.push(routeTag);
				selectedRouteList.forEach(function(tag){
					getPath(tag);
				})
				
				getVehiclePositions(selected);
			}
			else{
				currentTag = selectedRouteList.indexOf(routeTag);
				if(currentTag > -1){
					selectedRouteList.splice(currentTag,1);
				}

				//remove route along with the vehicles when the route is deselected 
				d3.select("#routes").selectAll("g.route-"+routeTag).remove();
				d3.select("#buses").selectAll("path.route-"+routeTag).remove();
			}
		};

		/**
		*Path is drawn by constructing line string from the coordinates
 		* @param {string} tag - Route Tag.
 		*/
		function getPath(tag){
			pathFactory.getPath(tag).then(function(data){
				let routeColor = "#" + data.data.route.color;
				let routePath = data.data.route.path;
				let linePath = pathFactory.getPathPoints(routePath);
				palette[tag] = routeColor;
				pathFactory.drawPath(tag,linePath,routeColor,path);		       	
			},function(error){
				$scope.message = "Error occured while drawing path";
			})
		};
		
		/**
		*Location of the vehicle on th map is plotted.
 		* @param {obj[]} routeList - List of selected routes that is to be shown on the map.
 		*/
		function getVehiclePositions(routeList){
			routeList.forEach(function(route){
				$scope.message = " ";
				d3.select("#buses").selectAll("path.route-"+route).remove();
				let color = palette[route];
				vehicleFactory.getVehiclePositions(route).then(function(vehicles){
					if(vehicles.length === 0){
						$scope.message = "no vehicles found on this route:" + route;
						return;
					}

					vehicles.forEach(function(vehicle){
						let x = map.projection([vehicle.lon,vehicle.lat])[0],
							y = map.projection([vehicle.lon,vehicle.lat])[1];
						vehicleFactory.plotVehicle(x,y,vehicle,color,g);
					})
				})
			})
		};

		function zoomed() {
    		svg.attr("transform", d3.event.transform);
  		};
		
		/**
		*if the scope variable which holds the list of routes is empty,
		*the list of routes are fetched.
		*/
		if(!$scope.routes){
			getRouteLists();
		};

		/**
		*called every 15 seconds to update the positions of the vehicles.
		*/
		$interval(function(){getVehiclePositions(selectedRouteList)},15000);
  		
	}]);