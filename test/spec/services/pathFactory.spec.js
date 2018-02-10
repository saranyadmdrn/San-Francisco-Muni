describe('Testing path Factory: service ', function(){
    let service;
    
    beforeEach(function(){
        module('sfmuniApp');
        inject(function($injector,$rootScope){
            service = $injector.get('pathFactory');
        })
    });

    it('should be created', function(){
        expect(service).toBeTruthy();
    });
})