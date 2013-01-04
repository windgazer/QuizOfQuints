describe("CircleGame", function() {
    
    var fakeDom = document.createDocumentFragment();

    it( "exists", function() {

        expect( CircleGame ).toBeDefined();

    });
    
    it("Can be instantiated", function() {

        var g = new CircleGame();
        
        expect( g ).toBeDefined();

    });
    
    it("can render a game-field", function() {

        var g = new CircleGame( fakeDom );
        
        waitsFor(function() {

            return g.getTemplate() !== null;

        }, "The template should be available", 1500);

        runs( function() {

            var t = g.getTemplate();

            expect( typeof t ).toBe("string");
            expect( t.indexOf(" circlegame ") > 0 ).toBe( true );
            
            g.renderGame();
            
            expect( fakeDom.innerHtml ).toBe( t );

        });

    });


})();