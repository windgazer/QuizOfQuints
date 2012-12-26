/**
 * User Data Access Object.
 * @see http://guide.couchdb.org/draft/cookbook.html
 * 
 */
module.exports = ( function( ) {

    var Config = require( '../Config.js' ), Request = require( 'request' );

    var db = Config["debug"] || process.debugEnabled ? Config["couchtdb"]
            : Config["couchdb"];

    var lock = false;

    function updateDB( dao, method, id, doc ) {

        if (lock)
            throw "DB is locked, please try again later!";
        lock = true;

        var attribs = {
            url : db + ( id ? "/" + id : "" ),
            method : method,
            "Content-Type" : "application/json"
        }
        if (typeof doc !== "undefined") {
            attribs["body"] = doc;
        }

        Request( attribs, function( e, r, body ) {

            if (!e && r.statusCode >= 200 && r.statusCode < 300) {
                dao.unlock( true );
                console.log( body );
            } else {
                dao.unlock( false );
                console.error( "Failed to " + method + " database", db, e,
                        r.statusCode, attribs );
            }

        } );
    }

    function deleteDB( dao ) {
        updateDB( dao, "DELETE" );
    }

    function createDB( dao ) {
        updateDB( dao, "PUT" );
    }

    function createViews( dao ) {

        var views = {
            _id : "_design/users",
            views : {
                email : {
                    map : "function( doc ) {\n    if (doc.email) {\n        emit( doc.email, null );\n    }\n}"
                }
            }
        }

        updateDB( dao, "PUT", "_design/users", JSON.stringify( views ) );

    }
    
    function addUser( dao, user ) {

        updateDB( dao, "PUT", user.get( "_id" ), user.toJSON()  );

    }

    var publics = {
        deleteDB : function( ) {
            deleteDB( this );
        },
        createDB : function( ) {
            createDB( this );
        },
        createViews : function( ) {
            createViews( this );
        },
        addUser : function( usr ) {
            addUser( this, usr );
        },
        unlock : function( success ) {
            lock = false;
        }
    }

    return publics;

} )( );