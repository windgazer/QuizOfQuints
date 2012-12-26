describe( "Commands", function( ) {

    var UserDao = require( '../dao/UserDao.js' );

    beforeEach( function( ) {
        spyOn( UserDao, 'unlock' ).andCallThrough( );
    } );

    it( "exists", function( ) {

        expect( UserDao ).toBeDefined( );

    } );

    it( "can create the db", function( ) {

        runs( function( ) {
            //Make sure a database exists...
            UserDao.createDB( );
        } );

        waitsFor( function( ) {
            return UserDao.unlock.calls.length > 0;
        }, "The unlock method should have been called", 3000 );

        runs( function( ) {
            UserDao.unlock.calls.length = 0;
            UserDao.deleteDB( );
        } );

        waitsFor( function( ) {
            return UserDao.unlock.calls.length > 0;
        }, "The unlock method should have been called", 3000 );

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
        }, "The unlock method should have been called", 3000 );

        runs( function( ) {
            UserDao.unlock.calls.length = 0;
            UserDao.createDB( );
        } );

        waitsFor( function( ) {
            return UserDao.unlock.calls.length > 0;
        }, "The unlock method should have been called", 3000 );

        runs( function( ) {
            expect( UserDao.unlock ).toHaveBeenCalledWith( true );
        } );

    } );

} );
