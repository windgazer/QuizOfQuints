describe("CircleGame", function() {
    
    var fakeDom = document.createDocumentFragment();

    it( "exists", function() {

        expect( CircleGame ).toBeDefined();

    });
    
    it("Will throw exception if no target node specified", function() {

        function throwingUp() {
            var g = new CircleGame();
        }
        
        expect( throwingUp ).toThrow();

    });
    
    it("can render a game-field", function() {

        var g = new CircleGame( fakeDom );
        //This proofs to be a dangerous hack, if attempted before creating the CircleGame
        //it causes some infinity loop I haven't been able to pinpoint yet...
    	ClassTemplate.addTemplate("CircleGame","<article id=\"${id}\" class=\"game circlegame fresh\"></article>");
        
        waitsFor( function() {

            return g.getTemplate() !== null;

        }, "The template should be available", 1500);

        runs( function() {

            var t = g.getTemplate();

            expect( typeof t ).toBe("string");
            expect( t.indexOf(" circlegame ") > 0 ).toBe( true );
            
            expect( fakeDom.innerHTML.length > 20 ).toBe( true );

        });

    });

})();