/*
Author : Hadi Gunawan
Tanggal mulai : Minggu, 12 Juni 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/


// initial setup
const express = require('express');
const router = express.Router();
const auth_controller = require('../controller/auth_controller');
// end intial setup

// all user routes
router.post('/login', auth_controller.login);
router.post('/logout', auth_controller.logout);
// end all user routes


module.exports = router;

