var mongoose = require('mongoose');
var rideSchema = mongoose.Schema({

        destination        : String,
        source   	   : String,
        time               : Date,
        seats              : Number,
        stops              : Number,
        negotiable	   : String,
        build	           : String,
        name	           : String,
        pno		   : String,
        email              : String

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Ride', rideSchema);