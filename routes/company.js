const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
	res.render("twenymoments.ejs", {title: "Tweny Moments"});
});

module.exports = router;
