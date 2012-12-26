/**
 * User Data Access Object.
 * @see http://guide.couchdb.org/draft/cookbook.html
 * 
 */
module.exports = ( function( ) {

    var Config = require( '../Config.js' ), Request = require( 'request' ),
        Events = require('events'),
        Util = require('util');

    var db = Config["debug"] || process.debugEnabled ? Config["couchtdb"]
            : Config["couchdb"];

    var lock = false,
        DAOEvents = function( ) {
            this.userRetreived = function( b ) {
                var results = JSON.parse( b );
                if ( results["rows"] && results["rows"].length > 0 ) {
                    console.log( "Sending userRetrieved event!", results["rows"] );
                    this.emit( "userRetrieved", results["rows"][0] );
                } else {
                    console.log( "No User Retrieved :(" );
                }
            }

        };
        
        DAOEvents.prototype = new Events.EventEmitter();
    

    function updateDB( dao, method, id, doc, callback ) {

        if (lock)
            throw "Connection is locked, please try again later!";
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
                if ( callback ) callback( body );
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
                    map : "function( doc ) {\n    if (doc.email) {\n        emit( doc.email, doc );\n    }\n}"
                }
            }
        }

        updateDB( dao, "PUT", "_design/users", JSON.stringify( views ) );

    }
    
    function addUser( dao, user ) {

        updateDB( dao, "PUT", user.get( "_id" ), user.toJSON()  );

    }

    /**
     * /tqoq/_design/users/_view/email?key="dino@extinct.com"
     */
    function getUserByEmail( dao, email ) {

        var id = "_design/users/_view/email?key=\""
                + encodeURIComponent( email ) + "\"";
        
        function cb( b ) {
            console.log( "Callback fired!", b );
            dao.events.userRetreived( b );
        }
        
        updateDB( dao, "GET", id, null, cb );

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
        getUserByEmail : function( email ) {
            getUserByEmail( this, email );
        },
        unlock : function( success ) {
            lock = false;
        },
        events: new DAOEvents()
    }

    return publics;

} )( );