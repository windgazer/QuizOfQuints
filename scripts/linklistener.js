/**
 * A listener that reacts on click in the document.body
 * and checks if it's a link. If a link is clicked
 * it then checks to see if the rel-attribute of that
 * link has a handler in the LinkListener, if so that
 * handler is called upon, if not the click is ignored.
 * It's easy to add new handlers for a specific page,
 * just call upon
 * LinkListener.addHandler(String, function);
 *
 * @class
 * @version 1.0.070721
 * @author Martin Reurings - http://www.windgazer.nl
 * @requires Events
 * @see Events
 * @depends events.js
 */

var LinkListener = {
	/**
	 * @private
	 */
	aRE:/^a$/i,
	/**
	 * @private
	 */
	handles: {
		internal:function(link) {
			return true;
		},
		external:function(link) {
			window.open(link.href, "_blank");
			return false;
		}
	},
	/**
	 * @private
	 */
	handler:function(e){
		var e = e||event;
		if (e.button > 1 || e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return true; //stop handling if not left mousebutton or when a modifier key was pressed.
		var target = e.target||e.srcElement;
		if (!target.nodeName) target = target.parentNode; //Old mozilla's and Safari's
		if (this.aRE.test(target.nodeName)) {
			var rel = target.getAttribute("rel");
			if (rel && this.handles[rel]) {
				if (!this.handles[rel](target)) return Events.cancel(e);
				else return true;
			}
		}		
	},
	/**
	 * Add an extra handler to the listener.
	 * Use this method to add an extra handler for
	 * a rel that hasn't been defined by default.
	 * 
	 * @param {String} id The value of the rel-attribute on which you want to react.
	 * @param {function} handler A function to handle the event, takes the link as a parameter.
	 */
	addHandler:function(id, handler) {
		this.handles[id] = handler;
	}
};

//Attach the linklistener
var LinkListenerClick = Events.attach(document.documentElement||document.body, "click", function(e) {
	LinkListener.handler(e);
});
//Cleanup
var LinkListenerUnload = Events.attach(document.documentElement||document.body, "unload", function() {
	Events.detach(LinkListenerClick);
	Events.detach(LinkListenerUnload);
});