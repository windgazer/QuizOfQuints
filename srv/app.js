(function() {
	var request = require( 'request' );
	var http = require( 'http' );

	http.createServer( function ( req, res ) {

		console.log( "Handling a request :)", req.url );
		
		var parts = req.url.substr(1).split( "/" );
		
		if ( parts && parts.length && parts[0] ) {

			console.log( parts );

		}
		
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end();

	} ).listen( 9615 );

})();