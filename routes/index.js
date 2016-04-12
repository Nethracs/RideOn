// var express = require('express');
// var app      = express();
// var router = express.Router();
// var ctr = require('../controllers/UsersController');
// var passport = require('passport');
// app.use(passport.initialize());
// app.use(passport.session());
// /* POST */
// // router.post('/signup', function(req, res){
// // 	users.signup(req, res)
// // });
// /*Get Index page */


// router.post('/signup', passport.authenticate('local-signup', {
//         successRedirect : '/team', // redirect to the secure profile section
//         failureRedirect : '/home', // redirect back to the signup page if there is an error
//         failureFlash : true // allow flash messages
//     }));

// // router.route('/signup')  
// //     .post(function(req,res) { ctr.signup(req,res) })

// // ///Log in page
// // router.route('/login')  
// //     .post(function(req,res) { ctr.login(req,res) })




// router.get('/', function(req, res, next) {
//   res.render('home', { title: 'home' });
// });
// /* GET home page. */
// router.get('/home', function(req, res, next) {
//   // res.render('home', { title: 'index' });
// });
// /* GET About page */
// router.get('/about', function(req, res, next) {
//   res.render('about', { title: 'About Us' });
// });

// /*Get Contact  page */
// router.get('/contact', function(req, res, next) {
//   res.render('contact', { title: 'Contact Us' });
// });

// /*Get Testimonials page */
// router.get('/testimonials', function(req, res, next) {
//   res.render('testimonials', { title: 'Testimonials' });
// });


// /*Get Testimonials page */
// router.get('/team', function(req, res, next) {
//   res.render('team', { title: 'Team' });
// });


// /* GET Loggedin Page */

// router.get('/loggedin', function(req, res, next) {
//   res.render('loggedin', { title: 'loggedin' });
// });


// router.get('/sample', function(req, res, next) {
//   res.render('sample', { title: 'sample' });
// });


// module.exports = router;




module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
   
    app.get('/', function(req, res) {
    res.render('home', { title: 'home' });
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    // app.get('/login', function(req, res) {

    //     // render the page and pass in any flash data if it exists
    //     res.render('login.ejs', { message: req.flash('loginMessage') }); 
    // });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    // app.get('/signup', function(req, res) {

    //     // render the page and pass in any flash data if it exists
    //     res.render('signup.ejs', { message: req.flash('signupMessage') });
    // });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
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

    //Signup
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('home', { message: req.flash('signupMessage') });
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

    // app.post('/login', passport.authenticate('local-signup', {
    //     successRedirect : '/team', // redirect to the secure profile section
    //     failureRedirect : '/signup', // redirect back to the signup page if there is an error
    //     failureFlash : true // allow flash messages
    // }));

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
