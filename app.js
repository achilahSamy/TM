const subdomain 	= require('express-subdomain');
const express = require('express');

const expressLayouts = require('express-ejs-layouts');
const mongoose = require ('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

require('./config/passport')(passport);
const config = require ('./config/database');

mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(()=>console.log('MongoDB connected ...'))
	.catch(err => console.log(err));

const path = require('path');

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(
  session({
		cookie:{
			expires: 600000
		},
		key: 'user_sid',
    secret: 'thisrandomsecret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
	if(req.session.user && req.cookies.user_sid){
		res.redirect('/app/dashboard')
	}
	next()
})

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use(express.static(path.join(__dirname)));

app.use(subdomain('company', require('./routes/company.js')));

app.use('/', require('./routes/home.js'));
app.use('/app', require('./routes/application.js'));
app.use('/portfolio', require('./routes/portfolio.js'));
app.use('/company', require('./routes/company.js'));
app.use('/contactus', require('./routes/mail.js'));
app.use('/send', require('./routes/mail.js'));
app.use('/store', require('./routes/store.js'));
app.use('/portfolio', require('./routes/portfolio.js'));


const port = process.env.port || 5000;

app.listen(port, () => console.log('Server started on port ' + port));
