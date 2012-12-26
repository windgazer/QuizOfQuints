module.exports = ( function( ) {

    var fs = require( 'fs' );

    function getUserHome( ) {
        return process.env[( process.platform == 'win32' ) ? 'USERPROFILE'
                : 'HOME'];
    }

    var configfile = ( typeof cfg === "undefined" ) ? getUserHome( )
            + "/qoqconfig.json" : cfg;
    var config = require( configfile );

    //overrides
    //provide some kind of mechanism that overrides the config-file

    return config;

} )( );