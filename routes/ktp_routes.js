/*
Author : Hadi Gunawan
Tanggal mulai : Jumat, 22 juli 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/


// initial setup
const express = require('express');
const router = express.Router();
const ktp_controller = require("../controller/ktp_controller");
// end intial setup

// all user routes
router.post('/show', ktp_controller.show);
// end all user routes


module.exports = router;

