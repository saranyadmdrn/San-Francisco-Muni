var app = angular.module("sfmuniApp",['ngRoute']);
app.value("mapsToLoad",["static/sfmaps/neighborhoods.json", "static/sfmaps/streets.json"]);
app.constant("agency","sf-muni");
app.constant("responseType", "publicJSONFeed");
app.config(function($routeProvider){
	$routeProvider
	.when("/",{
		templateUrl: "static/view/main.html",
		controller:"MainController"
	})

});