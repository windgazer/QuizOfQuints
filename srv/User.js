/**
 * User class, the only requirement is that it must use a valid email.
 * 
 */
module.exports = ( function( ) {

    function init( arg1, fb_id, gplus_id ) {

        if (typeof arg1 === "string") {
            var id = "";
            for ( var i = 0; i < arg1.length; i++ ) {
                id += arg1.charCodeAt( i ).toString( 16 );
            }
            this.values = {
                _id: id,
                email: arg1,
                fb_id : fb_id,
                gplus_id : gplus_id
            }
        } else {
            this.values = arg1;
        }

        if (!this.values || !this.values.email)
            throw "No email provided!!";

    }

    init.prototype = {
            
            get: function( field ) {

                return this.values[field];

            },

            toJSON: function() {

                return JSON.stringify( this.values );

            }

    }

    return init;

} )( );