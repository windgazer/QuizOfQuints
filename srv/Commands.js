module.exports = ( function() {

    var request = require( 'request' ),
    commands = new Array();

    var init = function( req, res ) {

        this.req = req;
        this.res = res;

    }

    init.prototype = {

            contains: function( cmd ) {

                if ( commands.length === 0 ) {

                    for ( var i in this ) {
                        if ( this.hasOwnProperty( i ) ) {
                            commands.push( JSON.stringify( i ) );
                        }
                    }

                }

                return commands.indexOf( cmd ) !== -1;

            },

            connect: function ( args ) {

                this.res.write( JSON.stringify( args ) );

            }

    }

    return init;

} )(  );