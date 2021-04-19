const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render("portfolio.ejs", {title: "Portfolio"});
});

router.get('/art', (req, res) => {
	res.render("art.ejs", {title: "Art"});
});

router.get('/babies', (req, res) => {
	res.render("babies.ejs", {title: "Babies"});
});

router.get('/beauty', (req, res) => {
	res.render("beauty.ejs", {title: "Beauty"});
});

router.get('/corporate', (req, res) => {
	res.render("corporate.ejs", {title: "Corporate"});
});

router.get('/family', (req, res) => {
	res.render("family.ejs", {title: "Family"});
});

router.get('/food', (req, res) => {
	res.render("food.ejs", {title: "Food"});
});

router.get('/lifestyle', (req, res) => {
	res.render("lifestyle.ejs", {title: "Lifestyle"});
});

router.get('/men', (req, res) => {
	res.render("men.ejs", {title: "Men"});
});

router.get('/social', (req, res) => {
	res.render("social.ejs", {title: "Social"});
});

router.get('/weddings', (req, res) => {
	res.render("weddings.ejs", {title: "Weddings"});
});

router.get('/women', (req, res) => {
	res.render("women.ejs", {title: "Women"});
});


module.exports = router;
