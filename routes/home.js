const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
	res.render("index.ejs", {title: "Home"});
});

router.get('/partnerwithus', (req, res) => {
	res.render("partnerwithus.ejs", {title: "Partner With Us"});
});

module.exports = router;
