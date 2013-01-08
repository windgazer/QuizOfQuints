/**
 * @requires App5upport/ClassTemplate.js
 */
var CircleGame = (function() {

    var templateName    = "CircleGame",
        template        = null,
        uid             = 0,
        pos, ko,
        queue           = new Array(),
        scoreq          = "#score",
        questionq       = "#question",
        answerq         = "#answer",
        correctionq     = "#correction",
        tempTemplate    = "<article id=\"${id}\">Loading...</article>";

    ClassTemplate.loadTemplate( templateName );

    function getId( game ) {
        if ( !game.id ) {
            game.id = templateName + uid++;
        }
        return game.id;
    }

    function getTemplate() {
        if ( template == null ) {
            template = ClassTemplate.getTemplate( templateName );
        }
        
        return template;
    }
    
    function selfdestruct( game ) {
        var h = null;
        while ( h = game.handlers.unshift() ) {
            LinkListener.removeHandler( h );
        }
    }

    function getElement( game, query ) {

        var g = document.getElementById( getId( game ) );
        if ( g ) {

            if ( query ) {
                return g.querySelector( query );
            }

            return g;

        } else {
            selfdestruct( game );
        }

        console.error("Game no longer exists", game, query);
        throw "Game no longer exists!!";

    }

    function setRandomPosition() {

        pos = Math.round( Math.random() * 11 ) + 1;
        ko = Interval.getKeyObjectByPos( pos );

    }

    function setElementValue( game, q, v ) {

        var e = getElement( game, q ),
            cv = e.firstChild;

        if ( cv ) {
            e.removeChild( cv );
        } 

        e.appendChild( document.createTextNode( v ) );

    }

    function reDraw( game, a ) {
        
        window.setTimeout( function() {
            getElement( game ).className += " fresh";
        }, 0 );

        setElementValue( game, questionq, ko.key );

    }

    function setCorrection( game, v ) {

        setElementValue( game, correctionq, v );

    }

    function clearCorrect( a ) {

        if ( a ) {

            var p = a.parentNode.parentNode,
                chldrn = p.getElementsByTagName( "li" );
            
            for (var i = chldrn.length, chld; chld = chldrn[--i];) {

                chld.className = chld.className.replace( " correct", "" );

            }

        }

    }
    
    function handleHotSpot( game, a ) {

        var g = getElement( game );

        var lpos = a.parentNode.id.replace( /^.*?([0-9]+)$/, "$1" ),
            lko = Interval.getKeyObjectByPos( lpos );
        
        clearCorrect( a );

        g.className = g.className.replace( / ?(in)?correct\b/gi, "" );
        
        if ( lpos == pos ) {

            g.className += " correct";
            ce.fireEvent( SCORE_INCREASE, { pos:pos } );
            a.parentNode.className += " correct";

        } else {

            g.className += " incorrect";
            setCorrection( game, ko.value );
            ce.fireEvent( SCORE_FAIL, { pos:pos, actual: ko } );

        }
    
        setRandomPosition();
        reDraw( game, a );

    }

    /**
     * Target can be either a node or a query, in the latter case it will be
     * resolved to a node using document.querySelector( target ).
     * 
     * @param target
     *            {string/node} Required for the game to be able to render.
     */
    function init( target ) {

        if (  typeof target === "string" ) {
            this.target = document.querySelector( target );
        } else {
            this.target = target;
        }

        this.handlers = new Array();
        var self = this;
        this.handlers.push( LinkListener.addHandler( "hotspot", function( a ) {

            handleHotSpot( self, a );

        } ) );
        this.handlers.push( LinkListener.addHandler( "redraw", function( a ) {

            setRandomPosition();
            reDraw( self );

        } ) );
        
        renderGame( this, queue );

    }

    /**
     * Render the game as content of the 'target' node.
     */
    function renderGame( game, queue ) {

        setRandomPosition();
        var t = getTemplate( game );
        if ( t === null ) {

            if ( queue ) {

                queue.push( {  target: game.target, id: game.getId() } );
                //Setup handler to wait for template...
                ce.attachEvent("template.finished", function(eventtype, template ) {
                    if ( template.type === templateName ) {
                        while ( queue.length ) {
                            renderGame( queue.shift() );
                        }
                    }
                })

            }

            t = tempTemplate;

        }
        if ( game.target ) {

            game.target.innerHTML = ClassTemplate.fillTemplate( t, { id: getId( game ) } );
            if ( t !== tempTemplate ) {
                reDraw( game );
            }

        }
        else throw "No target-node specified!!!";

    }

    init.prototype = {

            getTemplate: getTemplate,

            renderGame: function(  ) {

                return renderGame( this );

            },
            
            getId: function() {

                return getId( this );

            }

    }

    return init;

})();