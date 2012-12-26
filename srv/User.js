/**
 * User class, the only requirement is that it must use a valid email.
 * 
 */
module.exports = ( function( ) {

    function init( arg1, fb_id, gplus_id ) {

        if (typeof arg1 === "string") {
            this.values = {
                id : arg1,
                fb_id : fb_id,
                gplus_id : gplus_id
            }
        } else {
            this.values = arg1;
        }

        if (!this.values || !this.values.id)
            throw "No email provided!!";

    }

    init.prototype = {

            toJSON: function() {

                return JSON.stringify( this.values );

            }

    }

    return init;

} )( );