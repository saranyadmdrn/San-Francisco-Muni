/**
* Map Factory holds all the functionality that is necessary to draw the differnt layers map,
* creation of svg using d3, get projection 
* Name of the factory: mapFactory
* Name of the module: sfmuniApp
*/
angular.module("sfmuniApp")
	.factory("mapFactory",["$http", function($http) {
        let width = "700";
        let height = "500";

        let getProjection = function(){
            let projection = d3.geoMercator()
                .center([-122.56, 37.773])
                .scale(1)
                .translate([0,0])
                .precision(0);
            return projection;
        };

        let getSvg = function(){
            let svg =  d3.select("svg")
                .style('background', '#d0e1ed')
                .attr("width",width)
                .attr("height",height)
                .attr('preserveAspectRatio', 'xMidYMid')
                .attr('viewBox', '0 0 ' + Math.max(width, height) + ' ' + Math.min(width, height))
                .append("g");
            return svg;
        };

        let drawNeighborhoods = function(json,path){
            d3.select("#neighborhoods").selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d",path)
            .attr("z-index", -1)
            .attr("fill", "#edebd0")
            .attr("id","neighborhoods")
            .attr("stroke","#dbdbdb")
            .style('background', '#d0e1ed')

            d3.select("#texts")
            .selectAll("text")
            .data(json.features)
            .enter()
            .append("svg:text")
            .text(function(d){
                return d.properties.neighborho;
            })
            .attr('x', function(d){
                return path.centroid(d)[0];
            })
            .attr('y', function(d){
                return  path.centroid(d)[1];
            })
            .attr("text-anchor","middle")
            .attr("alignment-baseline","central")
            .attr("font-size","0.50em")
            .attr("fill","#666666");
        };

        let drawStreets = function(json,path){
            d3.select("#streets")
            .selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d",path)
            .attr("fill", "none")
            .attr("stroke-width", "1px")
            .attr("stroke", "#fff")
            .attr("z-index", 0)
            .attr("id","streets");
        };

		return{
			getProjection : getProjection,
            width : width,
            height : height,
            getSvg : getSvg,
            drawNeighborhoods : drawNeighborhoods,
            drawStreets : drawStreets
		};

	}]);