var Score = ( function() {

	var score = 0,
		hot = 0,
		hotRE = / ?hot[0-9]+\b/gi,
		n = document.getElementById("score");

	function incrScore() {
		
		score++;
		
		n.firstChild.nodeValue = score;

	};
	
	function incrHotness() {

		hot++;
		
		if ( hot > 4 ) return;

		if ( hotRE.test( n.className ) )
			n.className = n.className.replace( hotRE, " hot" + hot );
		else
			n.className += " hot" + hot;
		
		hotRE.test( "" );

	};

	function resetHotness() {

		hot = 0;
		
		n.className = n.className.replace( hotRE, "" );

	}

	var publicInterface = {

		increase : function() {

			incrScore();
			incrHotness();

		},
		
		fail: function () {

			resetHotness();

		}

	};

	ce.attachEvent(

		SCORE_INCREASE,
		function() {

			publicInterface.increase();

		}

	);

	ce.attachEvent(

		SCORE_FAIL,
		function() {

			publicInterface.fail();

		}

	);
	
	return publicInterface;

})();