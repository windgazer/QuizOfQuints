describe( "Commands", function( ) {

    process.debugEnabled = true; //Make sure tests are running on the test database...
    var UserDao = require( '../dao/UserDao.js' );
    var timeout = 10000;

    beforeEach( function( ) {
        spyOn( UserDao, 'unlock' ).andCallThrough( );
    } );

    it( "exists", function( ) {

        expect( UserDao ).toBeDefined( );

    } );

    it( "can remove the db", function( ) {

        runs( function( ) {
            //Make sure a database exists...
            UserDao.createDB( );
        } );

        waitsFor( function( ) {
            return UserDao.unlock.calls.length > 0;
        }, "The unlock method should have been called", timeout );

        runs( function( ) {
            UserDao.unlock.reset();
            UserDao.deleteDB( );
        } );

        waitsFor( function( ) {
            return UserDao.unlock.calls.length > 0;
        }, "The unlock method should have been called", timeout );

        runs( function( ) {
            expect( UserDao.unlock ).toHaveBeenCalledWith( true );
        } );

    } );

    it( "can create the db", function( ) {

        runs( function( ) {
            //Make sure no database exists...
            UserDao.deleteDB( );
        } );

        waitsFor( function( ) {
            return UserDao.unlock.calls.length > 0;
        }, "The unlock method should have been called", timeout );

        runs( function( ) {
            UserDao.unlock.reset();
            UserDao.createDB( );
        } );

        waitsFor( function( ) {
            return UserDao.unlock.calls.length > 0;
        }, "The unlock method should have been called", timeout );

        runs( function( ) {
            expect( UserDao.unlock ).toHaveBeenCalledWith( true );
        } );

    } );

    it( "can add views to the db", function( ) {

        runs( function( ) {
            UserDao.createViews( );
        } );

        waitsFor( function( ) {
            return UserDao.unlock.calls.length > 0;
        }, "The unlock method should have been called", timeout );

        runs( function( ) {
            expect( UserDao.unlock ).toHaveBeenCalledWith( true );
        } );

    } );

    it( "can add a user to the db", function( ) {

        runs( function( ) {
            var User = require( '../User.js' );
            var user = new User( "dodo@extinct.com" );

            UserDao.saveUser( user );
        } );

        waitsFor( function( ) {
            return UserDao.unlock.calls.length > 0;
        }, "The unlock method should have been called", timeout );

        runs( function( ) {
            expect( UserDao.unlock ).toHaveBeenCalledWith( true );
        } );

    } );

    it( "can retreive a user by email", function( ) {
        
        var email = "dino@extinct.com";
        var retrieved = null;

        runs( function( ) {
            var User = require( '../User.js' );
            var user = new User( email );

            UserDao.saveUser( user );
        } );

        waitsFor( function( ) {
            return UserDao.unlock.calls.length > 0;
        }, "The unlock method should have been called", timeout );

        runs( function( ) {
            expect( UserDao.unlock ).toHaveBeenCalledWith( true );
            UserDao.unlock.reset();
            UserDao.events.on( "userRetrieved", function( args ) {
                retrieved = args;
            } );
            UserDao.getUserByEmail( email );
        } );

        waitsFor( function( ) {
            return retrieved !== null;
        }, "Should have retrieved user by now :(", timeout * 2 );

        runs( function( ) {
            expect( retrieved ).not.toBe( null );
            expect( retrieved.toJSON ).toBeDefined();
            expect( retrieved.get("email") ).toEqual( email );
        } );

    } );

    it( "can delete a user", function( ) {
        
        var email = "velociraptor@extinct.com";
        var retrieved = null;

        runs( function( ) {
            var User = require( '../User.js' );
            var user = new User( email );

            UserDao.saveUser( user );
        } );

        waitsFor( function( ) {
            return UserDao.unlock.calls.length > 0;
        }, "The unlock method should have been called", timeout );

        runs( function( ) {
            expect( UserDao.unlock ).toHaveBeenCalledWith( true );
            UserDao.events.on( "userRetrieved", function( args ) {
                retrieved = args;
            } );
            UserDao.getUserByEmail( email );
        } );

        waitsFor( function( ) {
            return retrieved !== null;
        }, "Should have retrieved user by now :(", timeout * 2 );

        runs( function( ) {
            expect( retrieved.get("email") ).toEqual( email );

            UserDao.unlock.reset();
            UserDao.deleteUser( retrieved );
        } );

        waitsFor( function( ) {
            return UserDao.unlock.calls.length > 0;
        }, "The unlock method should have been called", timeout );

        runs( function( ) {
            expect( UserDao.unlock ).toHaveBeenCalledWith( true );
        } );

    } );

} );
