/**
 * This is a quick implementation for making sounds using HTML5 features. It is intended
 * for music apps that just need to mak specific tones and chords happen.
 * 
 * @credit http://www.phpied.com/webaudio-oscillator-in-js/
 * @overview
 */
var SoundLib = ( function( g ) {

    NOTES = {

        Ab  : [1],
        A   : [2],
        As  : [3],
        Bb  : [3],
        B   : [4],
        Bs  : [5],
        Cb  : [4],
        C   : [5],
        Cs  : [6],
        Db  : [6],
        D   : [7],
        Ds  : [8],
        Eb  : [8],
        E   : [9],
        Es  : [10],
        Fb  : [9],
        F   : [10],
        Fs  : [11],
        Gb  : [11],
        G   : [12],
        Gs  : [13]

    };
    
    for ( var i = 1; i < 9; i++ ) {

        for ( var n in NOTES ) {

            if ( NOTES.hasOwnProperty( n ) ) {

                NOTES[ n ][ i ] = NOTES[ n ][i - 1] + 12;

            }

        }

    }

    var pInterface  = {},
        scale       = {},
        actx,
        supported   = false,
        baseFreq    = 440,
        baseStep    = NOTES.A[4];

    //Feature detection, currently we have no backup
    try {
        actx = new ( g.AudioContext || g.webkitAudioContext );
        var o = actx.createOscillator( );
        delete o;
        supported = true; //If the above line don't work, we'll never get here...
    } catch (e) {
        console.log('No web audio oscillator support in this browser');
    }

    /**
     * Frequency calculation is based on http://www.phy.mtu.edu/~suits/NoteFreqCalcs.html
     * Basic formula being fn = f0 * a(to the power of n)
     * Where 'n' is the amount of half-steps away from the base note 'f0'
     * a = the twelth root of 2 = the number which when multiplied by itself 12 times equals 2 = 1.059463094359
     */
    function calculateFrequency( note ) {
    
        var n = note - NOTES.A[4];

        return baseFreq * Math.pow( 1.059463094359, n );

    }
    
    /**
     * Create an Oscillator at a single frequency.
     *
     * @argument [int] note The steps for the note at which to oscillate.
     */
    function createNote ( note ) {
    
        var freq = calculateFrequency( note );

        if ( supported ) {

            var osc = actx.createOscillator( );
            osc.frequency.value = freq;
            osc.connect( actx.destination );
            console.debug( "Creating an Oscillator at frequency: " + freq );
            
            return new Array( osc );

        }

    }
    
    /**
     * Add an Oscillator at a single frequency.
     *
     * @argument [int] note The steps for the note at which to oscillate.
     */
    function addNote ( oscs, note ) {

        oscs.push( createNote( note )[0] );
        return oscs;

    }

    /**
     * Start a set of Oscillators.
     *
     * @argument [Array<Oscillators>] oscs The Oscillators.
     */
    function play( oscs, t ) {

        if ( supported ) {

            for ( var i = oscs.length; i--; ) {

                oscs[ i ].noteOn( 0 );
                console.debug( "Starting an Oscillator at frequency: " + oscs[ i ].frequency.value );

            }

            if ( typeof t !== "undefined" ) {

                oscs.timer = window.setTimeout( function( ){

                    stop( oscs );

                }, t );

            }

        }

    }

    /**
     * Stop a set of Oscillators.
     *
     * @argument [Array<Oscillator>] oscs An Array of oscillators.
     */
    function stop( oscs ) {

        if ( supported ) {

            var osc;
            while ( osc = oscs.pop() ) {

                osc.noteOff( 0 );
                console.debug( "Stopping an Oscillator at frequency: " + osc.frequency.value );

            }

        }

    }

    function createChord( step ) {

        var chord = createNote( step );
        addNote( chord, step + 4 );
        addNote( chord, step + 7 );
        
        return chord;

    }

    pInterface = {

        play                : play,
        stop                : stop,
        createNote          : createNote,
        addNote             : addNote,
        createChord         : createChord,
        calculateFrequency  : calculateFrequency

    };

    for ( var n in NOTES ) {

        if ( NOTES.hasOwnProperty( n ) ) {

            pInterface[ n ] = NOTES[ n ];

        }

    }
    
    return pInterface;

})( window );