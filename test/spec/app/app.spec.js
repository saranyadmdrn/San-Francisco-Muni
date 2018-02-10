describe('Testing Route config: ', function(){
  let $route, $rootScope, $location, $httpBackend;

  beforeEach(function(){
    module('sfmuniApp');

    inject(function($injector){
      $route = $injector.get('$route');
      $rootScope = $injector.get('$rootScope');
      $location = $injector.get('$location');
      $httpBackend = $injector.get('$httpBackend');

      $httpBackend.when('GET', 'static/view/main.html').respond(200);
    });
  });

  it('should navigate to main', function(){
    $rootScope.$apply(function() {
      $location.path('/');
    });
    expect($location.path()).toBe('/');
    expect($route.current.templateUrl).toBe('static/view/main.html');
    expect($route.current.controller).toBe('MainController');
  });
});