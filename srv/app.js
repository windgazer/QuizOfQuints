(function() {
	var request = require( 'request' );
	var http = require( 'http' );
	var Commands = require('./commands.js');

	http.createServer( function ( req, res ) {

		var commands = new Commands( req, res );

		console.log( "Handling a request :)", req.url );
		res.writeHead( 200, {'Content-Type': 'text/plain'} );

		var parts = req.url.substr(1).split( "/" );

		if ( parts && parts.length && parts[0] ) {

		    var cmd = parts[0];
			console.log( parts );
			res.write( cmd );
			
			if ( commands.contains( cmd ) ) {
			    commands[cmd]( parts.slice( 1 ) );
			}

		}

		res.end(  );

	} ).listen( 9615 );

})();