var Interval = (function() {

	/**
	 * All musical keys, in order of the quintcirkel.
	 * The 'pos' attribute denotes the position on the quintcirkel in clockwise direction.
	 */
	var keys = new Array(

		{ key:"C",  value:"0",  pos:1  },
		{ key:"G",  value:"1#", pos:2  },
		{ key:"D",  value:"2#", pos:3  },
		{ key:"A",  value:"3#", pos:4  },
		{ key:"E",  value:"4#", pos:5  },
		{ key:"B",  value:"5#", pos:6  },
		{ key:"F#", value:"6#", pos:7  },
		{ key:"Gb", value:"6b", pos:7  },
		{ key:"Db", value:"5b", pos:8  },
		{ key:"Ab", value:"4b", pos:9  },
		{ key:"Eb", value:"3b", pos:10 },
		{ key:"Bb", value:"2b", pos:11 },
		{ key:"F",  value:"1b", pos:12 }

	);

	function getObjectByFieldValue( value, fieldname ) {

		for ( var i = 0; i < keys.length; i++ ) {

			var k = keys[i];
			
			if ( k[fieldname] === value ) return k;

		}

	}

	/**
	 * Get the musical key by the value of flats/sharps. Where 0 is none, 
	 * [n]# is n amount of sharps, [n]b is n amount of flats. For return value
	 * @see getValueByKey
	 */
	function getKeyByValue( value ) {

		return getObjectByFieldValue( value, "value" );

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

	}

	return {
		
		keys: keys,

		getKeyByValue: getKeyByValue,
		
		getValueByKey: getValueByKey,
		
		getKeyObjectByPos: getKeyObjectByPos

	}
	
})();