describe( "Commands", function( ) {

    var User = require( '../User.js' );

    it( "exists", function( ) {

        expect( User ).toBeDefined( );

    } );

    it( "throws an error when creating a user any arguments", function( ) {

        function construct( ) {
            var usr = new User( );
        }

        expect( construct ).toThrow( );

    } );

    it( "throws an error when creating a user without email", function( ) {

        function construct( ) {
            var usr = new User( "", null, null );
        }

        expect( construct ).toThrow( );

    } );

    it( "throws an error when creating a user without id", function( ) {

        function construct( ) {
            var usr = new User( {
                test : "whatever"
            } );
        }

        expect( construct ).toThrow( );

    } );

    it( "creates a new user as long as at least email is provided", function( ) {

        var usr = new User( "fake@email.duh" );

        expect( usr ).toBeDefined( );

    } );

    it( "can obtain a JSON version of the user object", function( ) {

        var usr = new User( "fake@email.duh" );

        expect( typeof usr.toJSON() ).toBe( "string" );

    } );

} );
