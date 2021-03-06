var CircleUI = (function() {

	var pos, ko,
		art = document.getElementsByTagName( "article" )[0],
		q = document.getElementById( "question" ),
		ag = document.getElementById( "answer" ),
		ac = document.getElementById( "correction" );
		
	function setRandomPosition() {

		var npos = pos;
		while ( npos === pos ) npos = Math.round( Math.random() * 11 ) + 1;
		pos = npos;
		ko = Interval.getKeyObjectByPos( pos )[ 0 ];

	}
	
	function setElementValue( e, v ) {

		var cv = e.firstChild;

		if ( cv ) {
			e.removeChild( cv );
		} 

		e.appendChild( document.createTextNode( v ) );

	}
	
	function reDraw( a ) {
		
		window.setTimeout(function() {
			art.className = "fresh";
		},0);

		setElementValue( q, ko.key );

	}
	
	function setCorrection( v ) {

		setElementValue( ac, v );

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

	LinkListener.addHandler( "hotspot", function( a ) {

		var lpos = a.parentNode.id.replace( /^.*?([0-9]+)$/, "$1" ),
			lko = Interval.getKeyObjectByPos( lpos )[ 0 ];
		
		clearCorrect( a );
		
		if ( lpos == pos ) {

			art.className = "correct";
			ce.fireEvent( SCORE_INCREASE, { pos:pos } );
			a.parentNode.className += " correct";

		} else {

			art.className = "incorrect";
			setCorrection(  ko.sig );
			ce.fireEvent( SCORE_FAIL, { pos:pos, actual: ko } );

		}
	
		setRandomPosition();
		reDraw( a );

	} );

	LinkListener.addHandler( "redraw", function( a ) {
	
		setRandomPosition();
		reDraw();

	} );
	
	setRandomPosition();
	reDraw();
	
});
