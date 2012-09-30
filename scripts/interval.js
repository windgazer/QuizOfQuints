var Interval = (function() {

    var tre = /`([^`]+)`/gi,
        template = "#mark`pos`::before { content: \"`v1`\"; } #mark`pos`::after { content: \"`v2`\"; }";

	/**
	 * All musical keys, in order of the quintcirkel.
	 * The 'pos' attribute denotes the position on the quintcirkel in clockwise direction.
	 */
	var keys = new Array(

		{ key:"C",  minor:"a",  sig:"0",  pos:1  },
		{ key:"G",  minor:"e",  sig:"1#", pos:2  },
		{ key:"D",  minor:"b",  sig:"2#", pos:3  },
		{ key:"A",  minor:"f#", sig:"3#", pos:4  },
		{ key:"E",  minor:"c#", sig:"4#", pos:5  },
		{ key:"B",  minor:"g#", sig:"5#", pos:6  },
		{ key:"F#", minor:"d#", sig:"6#", pos:7  },
		{ key:"Gb", minor:"eb", sig:"6b", pos:7  },
		{ key:"Db", minor:"bb", sig:"5b", pos:8  },
		{ key:"Ab", minor:"f",  sig:"4b", pos:9  },
		{ key:"Eb", minor:"c",  sig:"3b", pos:10 },
		{ key:"Bb", minor:"g",  sig:"2b", pos:11 },
		{ key:"F",  minor:"d",  sig:"1b", pos:12 }

	);

	function getObjectByFieldValue( value, fieldname ) {

	    var kn = new Array();

		for ( var i = 0; i < keys.length; i++ ) {

			var k = keys[i];
			
			if ( k[fieldname] === value ) kn.push( k );

		}

	    return kn.length === 1 ? kn[0] : kn;

	}

	/**
	 * Get the musical key by the value of flats/sharps. Where 0 is none, 
	 * [n]# is n amount of sharps, [n]b is n amount of flats. For return value
	 * @see getValueByKey
	 */
	function getKeyByValue( value ) {

		return getValueBySignature( value );

	};

	/**
	 * Get the value of flats/sharps by name of the key. Where for instance
	 * 'F sharp' is denoted as F# and 'G flat' as Gb. For the return value
	 * @see getKeyByValue
	 */
	function getValueByKey(  ) {

		return getObjectByFieldValue( value, "key" );

	};

	/**
	 * Get the key-object based on it's QuintCircle position. Position is
	 * 1-based for human ease of understanding ;)
	 */	
	function getKeyObjectByPos( position ) {

		return getObjectByFieldValue( parseInt( position, 10 ), "pos" );

	};

	function getValueBySignature( sig ) {

		return getObjectByFieldValue( sig, "sig" );

	};

	function parseTemplate( template, values ) {

	    var split = template.split(tre),
	        max = split.length, str = '', index = 0;

	    for (; index < max; index++) {
		str += split[index];
		str += values[split[++index]] || '';
	    }

	    return str;

	};

    function createStyleSheets() {

	var i = 1, str = '',
	    l1 = 'sig', l2 = 'minor';

	for ( ; i < 13; i++ ) {

	    var kn = getKeyObjectByPos( i ), v1 = '', v2 = '';
	    if ( !kn.hasOwnProperty("length") ) {
		kn = [ kn ];
	    }
	    for (var j = 0; j < kn.length; j++) {
		var k = kn[ j ];
		if ( j > 0) {
		    v1 += '/';
		    v2 += '/';
		}
		v1 += k[ l1 ];
		v2 += k[ l2 ];
	    }
	    str += parseTemplate( template, { pos:kn[0].pos, v1:v1, v2:v2 } );

	}

	var ss = document.createElement("style");
	ss.appendChild(document.createTextNode(str));

	document.getElementsByTagName("head")[0].appendChild(ss);

	return str;

    };

    createStyleSheets();

	return {
		
		keys: keys,

		getKeyByValue: getKeyByValue,
		
		getValueByKey: getValueByKey,
		
		getKeyObjectByPos: getKeyObjectByPos,

		createStyleSheets:createStyleSheets

	};
	
})();