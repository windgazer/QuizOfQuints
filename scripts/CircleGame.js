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

    }

    function renderGame( game ) {

        game.target.innerHtml = game.getTemplate();

    }

    init.prototype = {

            getTemplate: getTemplate,

            renderGame: function(  ) {

                return renderGame( this );

            }

    }

	return init;

})();