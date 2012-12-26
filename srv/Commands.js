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
                        commands.push( i );
                    }

                }
                
                console.log( cmd, JSON.stringify( commands ) )

                return commands.indexOf( cmd ) !== -1;

            },

            connect: function ( args ) {

                this.res.write( JSON.stringify( args ) );

            },

            /**
             * Push a new score to the database. A record of max ten scores is
             * being kept, apart from the highest ever and any score attached
             * to achievements.
             * 
             * The arguments expected are, the score, the user id and a valid
             * hash-code.
             */
            score: function( args ) {

                this.res.write( JSON.stringify( args ) );

            }

    }

    return init;

} )(  );