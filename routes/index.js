
var ride = require('../controllers/ride');
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================



/* GET home page. */
app.get('/', function(req, res) {
    
    if(isLoggedIn && typeof req.user !== 'undefined') {
        console.log(req.user.local);
        res.render('home', { loginmessage: req.flash('loginMessage'), current_user: req.user.local });
    } else {
        res.render('home', { loginmessage: req.flash('loginMessage') });
    }
});



    


// =====================================
// LOGOUT ==============================
// =====================================
app.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/home');
});




app.get('/options', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('options.ejs', { message: req.flash('loginMessage'),current_user: req.user.local} ); 
});
//Signup
app.get('/login', function(req, res) {
    // render the page and pass in any flash data if it exists

    res.render('home', { loginmessage: req.flash('loginMessage') });
}); 

//Signup
app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('home', { signupmessage: req.flash('signupMessage') });
});  


app.get('/options', isLoggedIn, function(req, res) {
  
    res.render('options.ejs', {current_user: req.user.local });

});

app.get('/needride', isLoggedIn, function(req, res) {
    res.render('needride.ejs', {
    user : req.user ,// get the user out of session and pass to template
    current_user: req.user.local 
    });
});

app.get('/postride', isLoggedIn, function(req, res) {
    res.render('postride.ejs', {
    user : req.user, // get the user out of session and pass to template
    message: req.flash('postrideMessage'),
    current_user: req.user.local 
    });
});




app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/options', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

app.post('/login', passport.authenticate('local', { 
    successRedirect: '/options',
    failureRedirect: '/login',
    failureFlash : true // allow flash messages
}));



app.post('/postride',isLoggedIn,function(req, res) {ride.postride(req,res)});
app.post('/needride',isLoggedIn,function(req, res) {ride.needride(req,res)});

/* GET home page. */
app.get('/home', function(req, res) {
  
  if(typeof req.user !== 'undefined' )
  {
    res.render('options', {current_user: req.user.local });
  }
  else
    res.render('home', { title: 'index' });
});
/* GET About page */
app.get('/about', function(req, res) {
   if(typeof req.user !== 'undefined' )
  {
    res.render('about', {current_user: req.user.local });
  }
  else
  res.render('about', { title: 'About Us' });
});

/*Get Contact  page */
app.get('/contact', function(req, res) {
   if(typeof req.user !== 'undefined' )
  {
    res.render('contact', {current_user: req.user.local });
  }
  else
  res.render('contact', { title: 'Contact Us' });
});

/*Get Testimonials page */
app.get('/testimonials', function(req, res) {
     if(typeof req.user !== 'undefined' )
  {
    res.render('testimonials', {current_user: req.user.local });
  }
  else
   
  res.render('testimonials', { title: 'Testimonials' });
});


/*Get Testimonials page */
app.get('/team', function(req, res) {
     if(typeof req.user !== 'undefined' )
  {
    res.render('team', {current_user: req.user.local });
  }
  else
  
  res.render('team', { title: 'Team' });
});




    
};







// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
