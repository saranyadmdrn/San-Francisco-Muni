describe('Testing route Factory: service ', function(){
    let validation;
    
    beforeEach(function(){
        module('sfmuniApp');
        inject(function($injector,$rootScope){
            validation = $injector.get('routeFactory');
        })
    });

    it('should be created', function(){
        expect(validation).toBeTruthy();
    });
})
