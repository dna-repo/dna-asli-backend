/*
Author : Hadi Gunawan
Tanggal mulai : 18 Juni 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/


// initial setup
const express = require('express');
const router = express.Router();
const komentar_controller = require('../controller/komentar_controller');
// end intial setup


// all user routes
router.get('/',komentar_controller.index);
router.post('/show',komentar_controller.show);
router.post('/store',komentar_controller.store);
// end all user routes


module.exports = router;

