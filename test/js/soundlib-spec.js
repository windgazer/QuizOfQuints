describe( "SoundLib", function( ) {
	
	beforeEach( function( ) {
	
	});
    
    it ( "Should return the steps to a specific note", function(  ) {

        var steps = SoundLib.A[4];

        expect( steps ).toEqual( 50 );

        steps = SoundLib.A[9];

        expect( steps ).toEqual( null );

        steps = SoundLib.C[0];

        expect( steps ).toEqual( 5 );

        steps = SoundLib.G[2];

        expect( steps ).toEqual( 36 );

    });
    
    it ( "Should return the frequency to a specific step", function(  ) {

        var freq = SoundLib.calculateFrequency( SoundLib.A[4] );
        
        expect( freq ).toEqual( 440 );
        
        freq = SoundLib.calculateFrequency( SoundLib.A[0] );
        
        expect( Math.round( freq ) ).toEqual( 28 );
        
        freq = SoundLib.calculateFrequency( SoundLib.G[2] );
        
        expect( Math.round( freq ) ).toEqual( 196 );
        
        freq = SoundLib.calculateFrequency( SoundLib.Bb[6] );
        
        expect( Math.round( freq ) ).toEqual( 1865 );

    });

    it ( "Should be able to return a 'note'", function(  ) {
    
        var note = SoundLib.createNote( SoundLib.A[4] );
        
        expect( typeof note ).toEqual( "object" );
        expect( note.length ).toEqual( 1 );
        expect( note[0].frequency.value ).toEqual( 440 );
    
    });

    it ( "Should be able to add a 'note'", function(  ) {
    
        var note = SoundLib.createNote( SoundLib.A[4] );
        SoundLib.addNote( note, SoundLib.A[4] + 4 );
        
        expect( typeof note ).toEqual( "object" );
        expect( note.length ).toEqual( 2 );
        expect( note[0].frequency.value ).toEqual( 440 );
        expect( Math.round( note[1].frequency.value ) ).toEqual( 554 );
    
    });

    it ( "Should be able to create a 'chord'", function(  ) {
    
        var note = SoundLib.createChord( SoundLib.A[4] );
        
        expect( typeof note ).toEqual( "object" );
        expect( note.length ).toEqual( 3 );
    
    });

    describe( "Can start/stop sound", function(  ) {

        var oscillators = null;
        
        it ( "Should be able to start a sound", function(  ) {

            oscillators = SoundLib.createNote( SoundLib.A[4] );
            spyOn( oscillators[0], 'noteOn' );
            SoundLib.play( oscillators );

            expect( oscillators[0].noteOn ).toHaveBeenCalled( );
            
        });
        
        it ( "Should be able to stop a sound", function(  ) {

            var n = oscillators[0];
            spyOn( n, 'noteOff' );
            SoundLib.stop( oscillators );

            expect( n.noteOff ).toHaveBeenCalled( );
            expect( oscillators.length ).toEqual( 0 );

        });
        
        it ( "Should be able to start a chord", function(  ) {

            oscillators = SoundLib.createChord( SoundLib.C[4] );
            var n = oscillators[0];
            spyOn( n, 'noteOn' );
            SoundLib.play( oscillators );

            expect( n.noteOn ).toHaveBeenCalled( );
            
        });
        
        it ( "Should be able to stop a chord", function(  ) {

            var n = oscillators[0];
            spyOn( n, 'noteOff' );
            SoundLib.stop( oscillators );

            expect( n.noteOff ).toHaveBeenCalled( );
            expect( oscillators.length ).toEqual( 0 );

        });

        
        it ( "Should be able to play sound for 'n' milliseconds", function(  ) {

            var n = null;

            runs( function(  ) {

                oscillators = SoundLib.createNote( SoundLib.A[4] );

                n = oscillators[0];
                spyOn( n, 'noteOn' );
                spyOn( n, 'noteOff' );

                SoundLib.play( oscillators, 1000 );

            } );
            
            waitsFor( function(  ) {

                return oscillators.length < 1;

            }, "oscillators should have been reduced to 0", 1500 );

            runs( function(  ) {

                expect( n.noteOn ).toHaveBeenCalled( );
                expect( n.noteOff ).toHaveBeenCalled( );

            } );
            
        });

    });

});
