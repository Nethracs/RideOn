var Ride            = require('../model/ride');
module.exports.postride= function(req, res) {
	backURL=req.header('Referer') || '/';
	console.log(req.body);
	var ride= new Ride(req.body);
	var ttime = new Date(req.body.date);
	ride.time = ttime;
	ride.save(function(err) {
        if (err) {
            res.send(err);
        }
        console.log("Ride Saved");
        res.render('postride.ejs', {
		    user : req.user, // get the user out of session and pass to template
		    message: "Ride Posted!!!"
		});
        // res.redirect(backURL);
    });
};


module.exports.needride= function(req, res) {
	backURL=req.header('Referer') || '/';
	// console.log(req.body);
	var ride= new Ride(req.body);

	Ride.find({ "destination":req.body.destination, "source":req.body.source}, function(err, doc) {
      if (doc == null) {
   		req.flash('rideerror', "No rides found baby!!!");
      }

      res.render('needride.ejs', {rides:doc});
   });
	
        // req.flash('postrideMessage', 'Ride Posted!');
        
   
};
