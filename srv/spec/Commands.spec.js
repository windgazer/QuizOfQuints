describe("Commands", function() {
	
    var Config = require('../Config.js');
    var Commands = require('../Commands.js');
    var commands = new Commands( null, {write:function(){}}, Config );
	    

    it("exists", function() {

        expect(Commands).toBeDefined();

    });

    it("can detect it contains certain commands", function() {

        expect(commands.contains("connect")).toBe(true);

        expect(commands.contains("score")).toBe(true);

        expect(commands.contains("dodo")).toBe(false);

    });
	

});
