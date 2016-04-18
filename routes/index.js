

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================



/* GET home page. */
app.get('/', function(req, res) {
    
    if(isLoggedIn && typeof req.user !== 'undefined') {
        res.render('index', { loginmessage: req.flash('loginMessage'), current_user: req.user.local });
    } else {
        res.render('index', { loginmessage: req.flash('loginMessage') });
    }
});






    
app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
        user : req.user // get the user out of session and pass to template
    });
});

// =====================================
// LOGOUT ==============================
// =====================================
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});




app.get('/options', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('options.ejs', { message: req.flash('loginMessage') }); 
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
    res.render('options.ejs', {
    user : req.user // get the user out of session and pass to template
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


/* GET home page. */
app.get('/home', function(req, res) {
  res.render('home', { title: 'index' });
});
/* GET About page */
app.get('/about', function(req, res) {
  res.render('about', { title: 'About Us' });
});

/*Get Contact  page */
app.get('/contact', function(req, res) {
  res.render('contact', { title: 'Contact Us' });
});

/*Get Testimonials page */
app.get('/testimonials', function(req, res) {
  res.render('testimonials', { title: 'Testimonials' });
});


/*Get Testimonials page */
app.get('/team', function(req, res) {
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
