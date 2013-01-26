var Score = ( function() {

	var templateName    = "Score",
	    template        = null,
        queue           = new Array(),
        hotRE           = / ?hot[0-9]+\b/gi,
	    uidi            = 0,
	    tempTemplate    = "<article id=\"${id}\">Loading...</article>";

    ClassTemplate.loadTemplate( templateName );

    function getTemplate() {
        if ( template == null ) {
            template = ClassTemplate.getTemplate( templateName );
        }
        
        return template;
    };

    function getId( score ) {
        if ( !score.id ) {
            score.id = templateName + uidi++;
        }
        return score.id;
    };
    
    function getNode( score ) {
        if (!score.node) {
            score.node = document.getElementById( getId( score ) );
        }
        return score.node;
    }

	function incrScore( score ) {
		
	    score.score++;
		
	    getNode( score ).firstChild.nodeValue = score.score;

	};
	
	function incrHotness( score ) {

	    var n = score.node;
        score.hot++;
		
		if ( score.hot > 4 ) return;

		if ( hotRE.test( n.className ) )
			n.className = n.className.replace( hotRE, " hot" + score.hot );
		else
			n.className += " hot" + score.hot;
		
		hotRE.test( "" );

	};

	function resetHotness( score ) {

        var n = getNode( score );
		score.hot = 0;
		
		n.className = n.className.replace( hotRE, "" );

	};

    function reDraw( score ) {

        score.score = -1;
        incrScore( score );

    }

    /**
     * Render the score as content of the 'target' node.
     */
    function renderScore( score, queue ) {

        var t = getTemplate( score );
        var n = getNode( score );
        if ( t === null ) {

            if ( queue ) {

                queue.push( {  node: score.node, id: getId( score ) } );
                //Setup handler to wait for template...
                ce.attachEvent("template.finished", function( eventtype, template ) {
                    if ( template.type === templateName ) {
                        while ( queue.length ) {
                            renderScore( queue.shift() );
                        }
                    }
                });

            }

            t = tempTemplate;

        }
        if ( n ) {
            
            n.innerHTML = ClassTemplate.fillTemplate( t, { id: getId( score ) } );
            score.node = null;

            if ( t !== tempTemplate ) {
                reDraw( score );
            }

        }
        else throw "No target-node specified!!!";

    }

    function publicInterface( target, score ) {

	    this.node = ( typeof target !== "string" ) ? target : document.querySelector( target );
	    this.score = ( typeof score === "undefined" ) ? 0 : score;
	    this.hot = 0;

	    var self = this;

	    ce.attachEvent(

	        SCORE_INCREASE,
	        function() {

	            self.increase( );

	        }

	    );

	    ce.attachEvent(

	        SCORE_FAIL,
	        function() {

	            self.fail();

	        }

	    );

	    renderScore( this, queue );

	};

	publicInterface.prototype = {

        getId : function(  ) {

            getId( this );

        },

        increase : function(  ) {

            incrScore( this );
            incrHotness( this );

        },
		
		fail: function (  ) {

			resetHotness( this );

		}

	};
	
	return publicInterface;

})();