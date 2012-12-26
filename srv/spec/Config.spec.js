describe( "Commands", function( ) {

    var Config = require( '../Config.js' );

    it( "exists", function( ) {

        expect( Config ).toBeDefined( );

    } );

    it( "has the expected properties", function( ) {

        expect( Config['fb-api'] ).toBeDefined( );
        expect( Config['google-api'] ).toBeDefined( );
        expect( Config['couchdb'] ).toBeDefined( );
        expect( Config['couchtdb'] ).toBeDefined( );

    } );

} );
