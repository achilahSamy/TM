const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');


const User = require('../models/User');

const { ensureAuthenticated } = require ('../config/auth');

router.get('/', (req, res) => res.render('welcome', { title: "Home" }));

router.get('/login', (req, res) => res.render('login', { title: "Login Page" }));

router.get('/register', (req, res) => res.render('register', { title: "Registration Page" }));

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      title: "Registration Page",
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          title: "Registration Page",
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => {
                req.flash('success_msg',
                  'You are now registered and can log in');
                res.redirect('/app/login');
              })
              .catch(err => console.log(err));
          });
        });
			}
		});
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/app/dashboard',
    failureRedirect: '/app/login',
    failureFlash: true
  }) (req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/app/login');
});

router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    name: req.user.name,
    title: "Dashboard"
  }));


module.exports = router;
