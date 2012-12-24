describe("Commands", function() {
	
    var Commands = require('../Commands.js');
    var commands = new Commands( null, {write:function(){}} );
	    

    it("exists", function() {

        expect(Commands).toBeDefined();

    });

    it("can detect it contains certain commands", function() {

        expect(commands.contains("connect")).toBe(true);

    });
	

});
