var CircleUI = (function() {

	var pos, ko,
		art = document.getElementsByTagName( "article" )[0],
		q = document.getElementById( "question" ),
		ag = document.getElementById( "answer" ),
		ac = document.getElementById( "correction" );
		
	function setRandomPosition() {

		pos = Math.round( Math.random() * 11 ) + 1,
		ko = Interval.getKeyObjectByPos( pos );

	}
	
	function setElementValue( e, v ) {

		var cv = e.firstChild;
		
		if ( cv ) {
			e.removeChild( cv );
		} 

		e.appendChild( document.createTextNode( v ) );

	}
	
	function reDraw() {
		
		window.setTimeout(function() {
			art.className = "fresh";
		},0);

		setElementValue( q, ko.key );

	}
	
	function setCorrection( v ) {

		setElementValue( ac, v );

	}

	LinkListener.addHandler( "hotspot", function( a ) {

		var lpos = a.parentNode.id.replace( /^.*?([0-9]+)$/, "$1" ),
			lko = Interval.getKeyObjectByPos( lpos )[ 0 ];
		
		if ( lpos == pos ) {

			art.className = "correct";
			ce.fireEvent( SCORE_INCREASE, { pos:pos } );

		} else {

			art.className = "incorrect";
			setCorrection(  ko.sig );
			ce.fireEvent( SCORE_FAIL, { pos:pos, actual: ko } );

		}
	
		setRandomPosition();
		reDraw();

	} );

	LinkListener.addHandler( "redraw", function( a ) {
	
		setRandomPosition();
		reDraw();

	} );
	
	setRandomPosition();
	reDraw();
	
})();