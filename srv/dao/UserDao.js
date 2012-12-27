/**
 * User Data Access Object.
 * @see http://guide.couchdb.org/draft/cookbook.html
 * 
 */
module.exports = ( function( ) {

    var Config = require( '../Config.js' ), Request = require( 'request' ),
        Events = require('events'),
        User = require('../user'),
        Util = require('util');

    // If debug is enabled either in config or on 'process', use the test
    // databasee
    var db = Config["debug"] || process.debugEnabled ? Config["couchtdb"]
            : Config["couchdb"];

    var lock = false,
        DAOEvents = function( ) {
            this.userRetreived = function( usrJSON ) {
                console.log( "Sending userRetrieved event!", usrJSON );
                this.emit( "userRetrieved", new User( usrJSON ) );
            }

        };
        
    DAOEvents.prototype = new Events.EventEmitter();

    /**
     * updateDB does a request to a couchDB. Although it's still called
     * updateDB, it can retrieve just as well. Some of the arguments are
     * optional, and as it is it can do pretty much anything :)
     * 
     * @param [object]
     *            dao This is the instance of the DAO (even though there's only
     *            one)
     * @param [string]
     *            method The method to use when processing a request ("GET",
     *            "PUT", "DELETE", etc)
     * @param [string]
     *            id An optional parameter, actually more of a path
     * @param [string]
     *            doc The optional content of a request, for PUT requests mostly
     * @param [function]
     *            callback The optional callback method, mostly to handle "GET"
     *            requests.
     */
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

    /**
     * delete the database for this DAO
     */
    function deleteDB( dao ) {
        updateDB( dao, "DELETE" );
    }

    /**
     * create the database for this DAO
     */
    function createDB( dao ) {
        updateDB( dao, "PUT" );
    }

    /**
     * create the views required for this DAO
     */
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

    /**
     * Save a user to the couchDB
     */
    function saveUser( dao, user ) {

        updateDB( dao, "PUT", user.get( "_id" ), user.toJSON()  );

    }

    /**
     * Get a user by email address
     * /tqoq/_design/users/_view/email?key="dino@extinct.com"
     */
    function getUserByEmail( dao, email ) {

        var id = "_design/users/_view/email?key=\""
                + encodeURIComponent( email ) + "\"";
        
        function cb( b ) {
            var results = JSON.parse( b );
            if ( results["rows"] && results["rows"].length > 0 ) {
                dao.events.userRetreived( results["rows"][0].value );
            } else {
                console.log( "No User Retrieved :(" );
            }
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
        saveUser : function( usr ) {
            saveUser( this, usr );
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