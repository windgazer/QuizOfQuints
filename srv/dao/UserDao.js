/**
 * User Data Access Object.
 * 
 */
module.exports = ( function( ) {

    var Config = require( '../Config.js' ), Request = require( 'request' );

    var db = Config["debug"] ? Config["couchtdb"] : Config["couchdb"];
    
    var lock = false;
    
    function updateDB( dao, method ) {

        if (lock) throw "DB is locked, please try again later!";
        lock = true;

        Request( { url:db, method:method, "Content-Type": "application/json" }, function (e, r, body) {

            if (!e && r.statusCode >= 200 && r.statusCode < 300 ) {
                dao.unlock( true );
                console.log(body);
            } else {
                dao.unlock( false );
                console.error("Failed to " + method + " database", db, e, r.statusCode);
            }

        } );
    }

    function deleteDB( dao ) {
        updateDB( dao, "DELETE" );
    }

    function createDB( dao ) {
        updateDB( dao, "PUT" );
    }

    var publics = {
        deleteDB : function() {
            deleteDB( this );
        },
        createDB : function() {
            createDB( this );
        },
        unlock : function( success ) {
            lock = false;
        }
    }

    return publics;

} )( );