/**
 * @requires App5upport/ClassTemplate.js
 */
var CircleGame = (function() {
    
    var templateName = "CircleGame",
        template = null;

    ClassTemplate.loadTemplate( templateName );
    
    function getTemplate() {
        if ( template == null ) {
            console.error("Gettin template")
            template = ClassTemplate.getTemplate( templateName );
        }
        
        return template;
    }
    
    function init( target ) {
        
        if (  typeof target === "string" ) {
            this.target = document.querySelector( target );
        } else {
            this.target = target;
        }
        
    }
    
    init.prototype = {

            getTemplate: getTemplate

    }

	return init;

})();