describe('MainController ', function() {

  let $controller,
      $scope

  beforeEach(module('sfmuniApp'));


  beforeEach(inject(function(_$controller_, $rootScope) {
    $scope = $rootScope.$new();

    $controller = _$controller_('MainController', {
      $scope: $scope
    });
  }));

  it('should be defined', function() {
    expect($controller).toBeDefined();
  });

});