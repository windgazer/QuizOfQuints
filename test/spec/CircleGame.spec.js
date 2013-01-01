describe("CircleGame", function() {
    
    var fakeDom = document.createDocumentFragment();

    it( "exists", function() {

        expect( CircleGame ).toBeDefined();

    });
    
    it("Can be instantiated", function() {

        var g = new CircleGame();
        
        expect( g ).toBeDefined();

    });


})();