const express = require('express');
const router = express.Router();

router.post('/register-client', async (req, res) => {});
router.post('/register-staff', async (req, res) => {});
router.post('/register-admin', async (req, res) => {});
router.post('/login-client', async (req, res) => {});
router.post('/login-staff', async (req, res) => {});
router.post('/login-admin', async (req, res) => {});

router.get('/profile', async (req, res) => {});

router.post('/user-protected', async (req, res) => {});
router.post('/staff-protected', async (req, res) => {});
router.post('/admin-protected', async (req, res) => {});


module.exports = router;