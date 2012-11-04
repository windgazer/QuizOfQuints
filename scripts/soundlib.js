/**
 * This is a quick implementation for making sounds using HTML5 features. It is intended
 * for music apps that just need to mak specific tones and chords happen.
 * 
 * @credit http://www.phpied.com/webaudio-oscillator-in-js/
 * @overview
 */
var SoundLib = ( function( g ) {

    var pInterface = {},
        scale = {},
        actx,
        supported = false;

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
     * Start an Oscillator on a single frequency.
     *
     * @argument [int] freq The frequemcy at which to oscillate.
     */
    function play( freq ) {

        if ( supported ) {

            var osc = actx.createOscillator( );
            osc.frequency.value = freq;
            osc.connect( actx.destination );
            osc.noteOn( 0 );
            console.debug( "Starting an Oscillator at frequency: " + freq );
            
            return new Array( osc );

        }

    }

    /**
     * Start an Oscillator on a single frequency.
     *
     * @argument [Array<Oscillator>] oscs An Array of oscillators.
     */
    function stop( oscs ) {

        if ( supported ) {

            for ( var i = oscs.length; i--; ) {

                oscs[i].noteOff( 0 );
                console.debug( "Stopping an Oscillator at frequency: " + oscs[i].frequency.value );
                delete oscs[i];

            }
            
            delete oscs

        }

    }
    
    pInterface = {

        play: play,
        stop: stop

    };
    
    return pInterface;

})( window );