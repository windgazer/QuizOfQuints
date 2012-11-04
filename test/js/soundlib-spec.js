describe( "ImageCache", function( ) {
	
	beforeEach( function( ) {
	
	});

    describe( "Can start/stop sound", function(  ) {

        var oscillators = null;
        
        it ( "Should be able to start a sound", function(  ) {

            oscillators = SoundLib.play( 440 );
            
            expect( typeof oscillators ).toEqual( "object" );
            expect( oscillators.length ).toEqual( 1 );
            
        });
        
        it ( "Should be able to stop a sound", function(  ) {

            SoundLib.stop( oscillators );

            expect( oscillators.length ).toEqual( 0 );

        });
        
        

    });

	describe( "Asynchronous specs", function( ) {
		
		var flag = false,
			data = null;

		beforeEach( function( ) {

			flag = false;
			data = null;

		});

		it( "should throw a custom-event when the image is finished loading", function( ){

			var uid = null;

			runs( function( ) {
				uid = ImageCache.loadImage( "./dodo.jpg" );
			});

			ce.attachEvent( ImageCache.EVENT_FINISHED, function( id, rdata ) {

				flag = true;
				data = rdata;
				return data;

			});

			waitsFor( function(){return flag}, "An event should cause the flag to be set to true!", 1000 );
			
			runs( function( ) {

				expect( ImageCache.getStatus( uid ) ).toBe( ImageCache.STATUS_FINISHED );
				expect( data ).toNotEqual( null );

			});

		});

		it( "should throw a custom-event when the image is fails to load", function( ){

			var uid = null;

			runs( function( ) {
				uid = ImageCache.loadImage( "./dodo2.jpg" );
			});

			ce.attachEvent( ImageCache.EVENT_FAILED, function( id, rdata ) {

				flag = true;
				data = rdata;
				return data;

			});

			waitsFor( function(){return flag}, "An event should cause the flag to be set to true!", 1000 );
			
			runs( function( ) {

				expect( ImageCache.getStatus( uid ) ).toBe( ImageCache.STATUS_FAILED );
				expect( data ).toNotEqual( null );

			});

		});

	});

});
