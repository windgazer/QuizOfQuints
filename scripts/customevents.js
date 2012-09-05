var SCORE_INCREASE = "SCORE_INCREASE",
	SCORE_RESET = "SCORE_RESET",
	SCORE_FAIL = "SCORE_FAIL"; //User fails to answer correctly.

(function(){
	
	var registry = [];

	function CustomEvents () {
		var now = new Date();
		this.id = "ce" + now.getTime();
		registry[this.id] = [];
	};
	
	CustomEvents.prototype = {

		fireEvent: function( eid, eInfo ) {

			var reg = registry[ this.id ];
			if ( reg ) {

				var handlers = reg[ eid ];
				if ( handlers ) {

					var self = this;

					for ( var i = 0; i < handlers.length; i++ ) {
						
						var hf = handlers[ i ],
							lid = eid,
							linfo = eInfo,
							sid = self.id,
							t = i * 10;

						hf( lid, linfo, sid );

					}

				}

			}

		},
		
		attachEvent: function ( eid, handler ) {

			var reg = registry[ this.id ];
			
			if ( reg === null || typeof reg === "undefined" ) {

				reg = [];
				registry[ this.id ] = reg;

			}
			
			var handlers = reg[ eid ];

			if ( handlers === null || typeof handlers === "undefined" ) {

				handlers = [];
				reg[ eid ] = handlers;

			}
			
			handlers.push( handler );

		}

	};
	
	window.ce = new CustomEvents();

})();